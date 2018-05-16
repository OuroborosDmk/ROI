#!/usr/bin/env Python
# coding=utf-8

import tornado.web
from methods.db import *

class SignupHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("signup.html")

    def post(self):
        zusername = self.get_argument("username")
        zpassword = self.get_argument("password")
        try:
            sql = "INSERT INTO users(username,password) VALUES (" + zusername +","+ zpassword +")"
            cur.execute(sql)
            conn.commit()

        except:
            conn.rollback()
        
        