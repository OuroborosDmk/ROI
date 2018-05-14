#!/usr/bin/env Python
# coding=utf-8

import tornado.web
import methods.readdb as end

class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("signup.html")

    def post(self):
        username = self.get_argument("username")
        password = self.get_argument("password")
        
        