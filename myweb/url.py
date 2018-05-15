#!/usr/bin/env Python
# coding=utf-8
"""
the url structure of website
"""

from handlers.login import LoginHandler
from handlers.index import IndexHandler
from handlers.signup import SignupHandler
from handlers.main import MainHandler
from handlers.index import IndexfHandler


url = [
    (r'/', LoginHandler),
    (r'/signup', SignupHandler),
    (r'/index', IndexHandler),
    (r'/main',MainHandler),
    (r'/indexf',IndexfHandler),
]