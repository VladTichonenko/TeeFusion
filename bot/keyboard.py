from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo
from aiogram import types
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo

async def User(message: types.Message):
    user_id = message.from_user.id
    return user_id

web_app_info = WebAppInfo(
    url='https://vladtichonenko.github.io/TeeFusion/',
)

glav_ru = InlineKeyboardMarkup(inline_keyboard=[
    [InlineKeyboardButton(text="Go to the App💡", web_app=web_app_info)],
    [InlineKeyboardButton(text="Перейти на канал", url='https://t.me/teefusion')],
    [
        InlineKeyboardButton(text="Чаты", callback_data='chat_ru'),
        InlineKeyboardButton(text="TeeFusion", callback_data='about')
    ],
    [InlineKeyboardButton(text="FAQ❓", callback_data='help_ru')],
])

Back = InlineKeyboardMarkup(inline_keyboard=[
    [InlineKeyboardButton(text="Назад ️", callback_data='back')],

])





