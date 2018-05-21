#!/usr/bin/env Python
# coding=utf-8

from methods.db import *
from handlers.signup import *


def select_table(table, column, condition, value):
    sql = "select " + column + " from " + table + " where " + condition + "='" + value + "'"
    cur.execute(sql)
    lines = cur.fetchall()
    return lines 

def add_user():
	try:
		sql = "INSERT INTO users(username,password) VALUES (" + username +","+ password +")"
		cur.execute(sql)
		conn.commit()

	except:
		conn.rollback()
add_user()