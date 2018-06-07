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
from handlers.index import ResultHandler
from handlers.index import ShowoneHandler
from handlers.index import MatrixHandler
from handlers.index import PatientHandler
from handlers.userpage import UserpageHandler
from handlers.userpage import ChangepswHandler
from handlers.userpage import ChangeinfHandler
'''
from handlers.admin import AdminloginHandler
from handlers.admin import AdminHandler
from handlers.admin import AdminpatHandler
from handlers.admin import AdminuserHandler
'''

url = [
    (r'/', LoginHandler),
    (r'/signup', SignupHandler),
    (r'/index', IndexHandler),
    (r'/main',MainHandler),
    (r'/indexf',IndexfHandler),
    (r'/result',ResultHandler),
    (r'/showone',ShowoneHandler),
    (r'/matrix',MatrixHandler),
    (r'/getpatient',PatientHandler),
    (r'/userpage',UserpageHandler),
    (r'/changepsw',ChangepswHandler),
    (r'/changeinf',ChangeinfHandler)
]