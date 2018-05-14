#!/usr/bin/env Python
# coding=utf-8

from methods.db import *
from handlers.signup import username
from handlers.signup import password

#检查是否有该用户
def select_table(table, column, condition, value):
    sql = "select " + column + " from " + table + " where " + condition + "='" + value + "'"
    cur.execute(sql)
    lines = cur.fetchall()
    return lines 

#添加用户
def add_user():
	sql = "select " + column + " from " + table + " where " + condition + "='" + value + "'"
	cur.excute(sql)
	lines = cur.fetchall()
	i=0
	while username==lines[i][2]
		
	if :
		return false
	else:
		try:
			sql = "INSERT INTO users(username,password) VALUES (" + username +","+ password +")"
			cur.execute(sql)
			conn.commit()
		except:
			conn.rollback()
