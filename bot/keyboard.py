from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo

web_app_info = WebAppInfo(
    url='https://vladtichonenko.github.io/TeeFusion/',
)

glav_ru = InlineKeyboardMarkup(inline_keyboard=[
    [InlineKeyboardButton(text="Go to the App💡", web_app=web_app_info)],
    [InlineKeyboardButton(text="Перейти на канал", url='https://t.me/1')],
    [
        InlineKeyboardButton(text="Чаты", callback_data='chat_ru'),
        InlineKeyboardButton(text="TeeFision", callback_data='about')
    ],
    [InlineKeyboardButton(text="FAQ❓", callback_data='help_ru')],
])

Back = InlineKeyboardMarkup(inline_keyboard=[
    [InlineKeyboardButton(text="Назад ️", callback_data='back')],

])





