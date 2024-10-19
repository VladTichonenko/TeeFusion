from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo
from aiogram import types

async def user_id(message):
    return message.from_user.id

web_app_info = WebAppInfo(
    url=f"https://teefusion-tma.local/{user_id()}",     # всавь сюда ссылку и надо оставить user_id
)

glav_ru = InlineKeyboardMarkup(inline_keyboard=[
    [InlineKeyboardButton(text="Go to the App💡", web_app=web_app_info)],
    [InlineKeyboardButton(text="Перейти на канал", url='https://t.me/teefusion')],
    [
        InlineKeyboardButton(text="Чаты", callback_data='chat_ru'),
        InlineKeyboardButton(text="TeeFision", callback_data='about')
    ],
    [InlineKeyboardButton(text="FAQ❓", callback_data='help_ru')],
])

Back = InlineKeyboardMarkup(inline_keyboard=[
    [InlineKeyboardButton(text="Назад ️", callback_data='back')],

])





