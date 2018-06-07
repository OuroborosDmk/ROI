#!/usr/bin/env Python
# coding=utf-8

import tornado.web
import os
import re
from methods.db import conn
from methods.db import cur
import methods.readdb as mrd
import tornado.escape

class AdminloginHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("adminlogin.html")
    def post(self):
        username = self.get_argument("name")
        password = self.get_argument("password")
        user_infos = mrd.select_table(table="adminusers",column="*",condition="username",value=username)
        if user_infos:
            db_pwd = user_infos[0][2]
            if db_pwd == password:
                self.write("welcome")
            else: 
                self.write("password error")
        else:
            self.write("user error")

class AdminHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("admin.html")
    def post(self):
        a="1"

class AdminpatHandler(tornado.web.RequestHandler):
    def get(self):
        sql="select * from patients"
        cur.execute(sql)
        user_infos=cur.fetchall()
        self.write(str(len(user_infos)));
    def post(self):
        indexcount=self.get_argument("postcount")
        count=int(indexcount)
        sql = "select * from patients"
        cur.execute(sql)
        user_infos=cur.fetchall()
        p_name=user_infos[count][1]
        p_sex=user_infos[count][2]
        p_age=str(user_infos[count][3])
        p_height=str(user_infos[count][4])
        p_weight=str(user_infos[count][5])
        p_occ=user_infos[count][6]
        self.write({"patientname":p_name,"patientsex":p_sex,"patientage":p_age,"patientheight":p_height,"patientweight":p_weight,"patientocc":p_occ})

class AdminuserHandler(tornado.web.RequestHandler):
    def get(self):
        sql="select * from patients"
        cur.execute(sql)
        user_infos=cur.fetchall()
        self.write(str(len(user_infos)));
    def post(self):
        indexcount=self.get_argument("postcount")
        count=int(indexcount)
        sql = "select * from users"
        cur.execute(sql)
        user_infos=cur.fetchall()
        p_name=user_infos[count][1]
        p_sex=user_infos[count][2]
        p_age=str(user_infos[count][3])
        p_height=str(user_infos[count][4])
        p_weight=str(user_infos[count][5])
        p_occ=user_infos[count][6]
        self.write({"patientname":p_name,"patientsex":p_sex,"patientage":p_age,"patientheight":p_height,"patientweight":p_weight,"patientocc":p_occ})