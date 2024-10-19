from aiogram import Bot, Dispatcher, Router, types
from aiogram.filters import CommandStart, Command
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo
import asyncio
import config
import keyboard
from aiogram import Router
import requests

router=Router()
bot = Bot(token=config.TOKEN)



# Создаем роутер
router = Router()

@router.message(CommandStart())
async def start_handler(message: types.Message):
    user_id = message.from_user.id
    username = message.from_user.username or "Без ника"

    # Отправляем запрос на создание пользователя через API
    try:
        response = requests.post(f'http://your-api-url.com/users', json={ # сюда вставить ссылку на сайт и сотавить апи users
            'user_id': user_id,
            'name': username,
            'balance': 5  # Начальный баланс может быть 0 или любым другим значением
        })

        if response.status_code == 201:  # Если пользователь успешно создан
            await message.answer(f"Добро пожаловать в проект TeeFision, {username}!", reply_markup=keyboard.glav_ru)
        else:
            await message.answer("Ошибка при создании пользователя. Попробуйте позже.")
    except Exception as e:
        await message.answer("Произошла ошибка при создании пользователя. Попробуйте позже.")
        print(f"Ошибка при отправке запроса на создание пользователя: {e}")

# Обработчики callback_query

@router.callback_query(lambda query: query.data == 'help_ru')
async def help_handler(callback_query: types.CallbackQuery):
    await callback_query.message.delete()
    await callback_query.message.answer("Появился вопрос?\nСвяжись с нашим менеджером @Vlad_Tichonenko", reply_markup=keyboard.Back)

@router.callback_query(lambda query: query.data == 'back')
async def back_handler(callback_query: types.CallbackQuery):
    await callback_query.message.delete()
    await callback_query.bot.send_message(callback_query.from_user.id, "Главное меню", reply_markup=keyboard.glav_ru)

@router.callback_query(lambda query: query.data == 'chat_ru')
async def chat_handler(callback_query: types.CallbackQuery):
    await callback_query.message.delete()
    await callback_query.message.answer("Список наших чатов 📝\n https://t.me/BelarusTON \n https://t.me/ITtbcstudio", reply_markup=keyboard.Back)

@router.callback_query(lambda query: query.data == 'about')
async def about_handler(callback_query: types.CallbackQuery):
    await callback_query.message.delete()
    await callback_query.message.answer("TeeFision - это ...", reply_markup=keyboard.Back)

# Обработчик команды /admin
@router.message(Command(commands=['admin']))
async def admin_handler(message: types.Message):
    # Счётчик уведомлений (в реальной логике его нужно получать динамически, например, из базы данных)
    count = 0  # Примерное значение количества уведомлений

    if message.from_user.id in [765843635, 165566970, 6850731097]:
        # Формируем клавиатуру с динамическим количеством уведомлений
        admin_keyboard = InlineKeyboardMarkup(inline_keyboard=[
            [InlineKeyboardButton(text=f"Мои уведомления💡 [{count}]", callback_data='note')],
            [InlineKeyboardButton(text="Посмотреть голосования️", url='https://example.com')]
        ])

        await message.answer(
            f"Добро пожаловать, {message.from_user.first_name}, \nв панель Супер-Админа🦸",
            reply_markup=admin_keyboard
        )
    else:
        await message.answer("Вы не являетесь Админом ❌")

@router.callback_query(lambda query: query.data == 'note')
async def about_handler(callback_query: types.CallbackQuery):
    await callback_query.message.delete()
#     добавить уведомления
    await callback_query.bot.send_message(callback_query.from_user.id, "У вас пока нет уведомления", reply_markup=keyboard.Back)


# Функция запуска бота
async def main():
    dp = Dispatcher()
    dp.include_router(router)
    await dp.start_polling(bot)

if __name__ == '__main__':
    asyncio.run(main())
