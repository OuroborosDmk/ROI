#!/usr/bin/env Python
# coding=utf-8

import tornado.web
import methods.readdb as mrd
import os

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("login.html")

    def post(self):
        count1 = 0    #计数大文件夹下共有多少个小文件夹
        for filename in os.listdir("D:\Python34\myweb\statics\pic"):
            count1 += 1
        return count1