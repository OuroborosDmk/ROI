#!/usr/bin/env Python
# coding=utf-8

import tornado.web
import methods.readdb as mrd
#from tornado.escape import json_decode

class LoginHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("login.html")

    def post(self):
        #data=json_decode(self.request.body)
        #username=data['username']
        #password=data['password']
        username = self.get_argument("name")
        password = self.get_argument("password")
        user_infos = mrd.select_table(table="users",column="*",condition="username",value=username)
        if user_infos:
            db_pwd = user_infos[0][2]
            if db_pwd == password:
                txtpath=r"D:\Python34\myweb\static\value\username.txt"
                f = open(txtpath,'a')
                f.seek(0)
                f.truncate()
                f.write(username)                   
                f.close()
                self.write("welcome")
            else: 
                self.write("password error")
        else:
            self.write("user error")
        
