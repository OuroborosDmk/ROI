#!/usr/bin/env Python
# coding=utf-8

import tornado.web
from methods.db import *

class SignupHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("signup.html")

    def post(self):
        zusername = self.get_argument("zusername")
        zpassword = self.get_argument("zpassword")
        zname = self.get_argument("zname")
        zmailbox = self.get_argument("zmailbox")
        zoccupation = self.get_argument("zoccupation")
        zcompany = self.get_argument("zcompany")
        sql = "select * from users where username ='" + zusername + "'"
        cur.execute(sql)
        lines = cur.fetchall()
        if lines:
            self.write("error")
        else:
            try:
                sql="INSERT INTO users(username,password,name,mailbox,occupation,company) VALUES (" + zusername +","+ zpassword +","+ zname +","+ zmailbox +","+ zoccupation +","+ zcompany +")"
                cur.execute(sql)
                conn.commit()
            except:
                conn.rollback()
                return false   
            self.write("ok")      
        
        
        