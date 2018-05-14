#!/usr/bin/env Python
# coding=utf-8

import tornado.web
from methods.db import *

class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("signup.html")

    def post(self):
        username = self.get_argument("username")
        password = self.get_argument("password")
        try:
            sql = "INSERT INTO users(username,password) VALUES (" + username +","+ password +")"
            cur.execute(sql)
            conn.commit()

        except:
            conn.rollback()
        
        