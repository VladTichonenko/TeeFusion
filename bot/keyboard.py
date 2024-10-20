from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton

# Клавиатура для возврата назад
Back = InlineKeyboardMarkup(inline_keyboard=[
    [InlineKeyboardButton(text="Назад ️", callback_data='back')]
])

# Пример клавиатуры с кнопками
glav_ru = InlineKeyboardMarkup(inline_keyboard=[
    [InlineKeyboardButton(text="Перейти на канал", url='https://t.me/teefusion')],
    [
        InlineKeyboardButton(text="Чаты", callback_data='chat_ru'),
        InlineKeyboardButton(text="TeeFision", callback_data='about')
    ],
    [InlineKeyboardButton(text="FAQ❓", callback_data='help_ru')],
])
