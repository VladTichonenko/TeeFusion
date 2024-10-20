import asyncio
from aiogram import Bot, Dispatcher, Router, types
from aiogram.filters import CommandStart, Command
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo
import requests
import config
import keyboard

# Инициализация бота и роутера
bot = Bot(token=config.TOKEN)
router = Router()

# Функция для получения user_id
async def user_id(message):
    return message.from_user.id

# Обработчик команды /start
@router.message(CommandStart())
async def start_handler(message: types.Message):
    user_id_value = await user_id(message)  # Получаем user_id
    web_app_info = WebAppInfo(
        url=f"https://elaborate-cascaron-d5d5b0.netlify.app/{user_id_value}",  # Формируем URL с user_id
    )

    # Создаем клавиатуру
    glav_ru = InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="Go to the App💡", web_app=web_app_info)],
        [InlineKeyboardButton(text="Перейти на канал", url='https://t.me/teefusion')],
        [
            InlineKeyboardButton(text="Чаты", callback_data='chat_ru'),
            InlineKeyboardButton(text="TeeFision", callback_data='about')
        ],
        [InlineKeyboardButton(text="FAQ❓", callback_data='help_ru')],
    ])

    # Отправляем сообщение с клавиатурой
    await message.answer(f"Добро пожаловать, {message.from_user.username or 'Без ника'}!", reply_markup=glav_ru)

# Обработчик команды /admin
@router.message(Command(commands=['admin']))
async def admin_handler(message: types.Message):
    count = 0  # Примерное значение количества уведомлений

    if message.from_user.id in [765843635, 165566970, 6850731097]:
        admin_keyboard = InlineKeyboardMarkup(inline_keyboard=[
            [InlineKeyboardButton(text=f"Мои уведомления💡 [{count}]", callback_data='note')],
            [InlineKeyboardButton(text="Посмотреть голосования️", url='https://example.com')]
        ])
        await message.answer(f"Добро пожаловать, {message.from_user.first_name}, в панель Супер-Админа🦸", reply_markup=admin_keyboard)
    else:
        await message.answer("Вы не являетесь Админом ❌")

# Примерные обработчики callback_query
@router.callback_query(lambda query: query.data == 'help_ru')
async def help_handler(callback_query: types.CallbackQuery):
    await callback_query.message.delete()
    await callback_query.message.answer("Появился вопрос?\nСвяжись с нашим менеджером @Vlad_Tichonenko", reply_markup=keyboard.Back)

@router.callback_query(lambda query: query.data == 'back')
async def back_handler(callback_query: types.CallbackQuery):
    await callback_query.message.delete()
    await callback_query.bot.send_message(callback_query.from_user.id, "Главное меню", reply_markup=keyboard.glav_ru)

# Функция запуска бота
async def main():
    dp = Dispatcher()
    dp.include_router(router)
    await dp.start_polling(bot)

# Запуск бота
if __name__ == '__main__':
    asyncio.run(main())
