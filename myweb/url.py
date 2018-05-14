#!/usr/bin/env Python
# coding=utf-8
"""
the url structure of website
"""

from handlers.signup import IndexHandler    #假设已经有了

url = [
    (r'/', IndexHandler),
]