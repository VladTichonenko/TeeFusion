from aiogram import Bot, Dispatcher, Router, types
from aiogram.filters import CommandStart, Command
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo
import asyncio
import config
import keyboard

bot = Bot(token=config.TOKEN)

# Создаем роутер
router = Router()

# Обработчик команды /start
@router.message(CommandStart())
async def start_handler(message: types.Message):
    await message.answer("Добро пожаловать в проект TeeFision", reply_markup=keyboard.glav_ru)

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
    await callback_query.message.answer("Список наших чатов 📝\n chat1\n chat2\n chat3", reply_markup=keyboard.Back)

@router.callback_query(lambda query: query.data == 'about')
async def about_handler(callback_query: types.CallbackQuery):
    await callback_query.message.delete()
    await callback_query.message.answer("TeeFision - это ...", reply_markup=keyboard.Back)

# Обработчик команды /admin
@router.message(Command(commands=['admin']))
async def admin_handler(message: types.Message):
    # Счётчик уведомлений (в реальной логике его нужно получать динамически, например, из базы данных)
    count = 0  # Примерное значение количества уведомлений

    if message.from_user.id in [765843635, 165566970]:
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
