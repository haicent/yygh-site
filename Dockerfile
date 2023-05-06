FROM node:14.17.6

WORKDIR /app
#把.nuxt目录下的所有内容复制到/app/.nuxt/
COPY .  /app/

#安装核心依赖  npm cache clean -f
RUN ["npm","install","--registry=https://registry.npm.taobao.org"]
RUN ["npm","run","build"]
EXPOSE 3000
CMD ["npm", "run", "start"]