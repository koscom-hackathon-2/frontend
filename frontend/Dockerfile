# 베이스 이미지로 node:18을 사용합니다.
FROM node:18

# 작업 디렉터리를 생성하고 설정합니다.
WORKDIR /app

# 패키지 파일들을 복사합니다.
COPY package.json yarn.lock ./

# 의존성을 설치합니다.
RUN yarn install

# 애플리케이션 소스를 복사합니다.
COPY . .

# Tailwind CSS 초기화 및 빌드
RUN npx tailwindcss init
RUN yarn build

# 포트를 노출합니다.
EXPOSE 3000

# 애플리케이션을 시작합니다.
CMD ["yarn", "start"]
