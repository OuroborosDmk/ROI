#!/usr/bin/env Python
# coding=utf-8

import tornado.web
import os
import re
from methods.db import conn
from methods.db import cur
import tornado.escape

class UserpageHandler(tornado.web.RequestHandler):
	def get(self):
		self.render("userpage.html")
	def post(self):
		username=self.get_argument("username")
		sql = "select * from users where username ="+username+""
		cur.execute(sql)
		user_infos=cur.fetchall()
		u_name=user_infos[0][3]
		mailbox=user_infos[0][4]
		occ=user_infos[0][5]
		com=user_infos[0][6]
		self.write({"u_name":u_name,"mailbox":mailbox,"occ":occ,"com":com})

class ChangepswHandler(tornado.web.RequestHandler):
	def get(self):
		username=self.get_argument("username")
		password=self.get_argument("password")
		sql = "select * from users where username ="+username+""
		cur.execute(sql)
		user_infos=cur.fetchall()
		db_pwd=user_infos[0][2]
		if db_pwd==password:
			self.write("1")
	def post(self):
		username=self.get_argument("username")
		newpassword=self.get_argument("newpassword")
		try:
			sql="UPDATE users SET password= '"+ newpassword +"'WHERE username = '" + username + "'"
			cur.execute(sql)
			conn.commit()
		except:
			conn.rollback()
			return false

class ChangeinfHandler(tornado.web.RequestHandler):
	def post(self):
		username=self.get_argument("username")
		u_name=self.get_argument("u_name")
		if u_name=="":
			sql = "select * from users where username ="+username+""
			cur.execute(sql)
			user_infos=cur.fetchall()
			u_name=user_infos[0][3]
		mailbox=self.get_argument("mailbox")
		if mailbox=="":
			sql = "select * from users where username ="+username+""
			cur.execute(sql)
			user_infos=cur.fetchall()
			mailbox=user_infos[0][4]
		occ=self.get_argument("occ")
		if occ=="":
			sql = "select * from users where username ="+username+""
			cur.execute(sql)
			user_infos=cur.fetchall()
			occ=user_infos[0][5]
		com=self.get_argument("com")
		if com=="":
			sql = "select * from users where username ="+username+""
			cur.execute(sql)
			user_infos=cur.fetchall()
			com=user_infos[0][6]
		try:
			sql="UPDATE users SET name= '"+ u_name +"',mailbox='"+ mailbox +"',occupation='"+ occ +"',company='"+ com +"'WHERE username = '" + username + "'"
			cur.execute(sql)
			conn.commit()
		except:
			conn.rollback()
			return false
