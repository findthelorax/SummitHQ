```
git init
git add .
git commit -m "Initial commit"

git remote add origin <repository-url>

git branch -M main
git push -u origin main
```

cd backend

Open Powershell as Admin
```
Get-ExecutionPolicy
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

install prisma

edit prisma/schema.prisma
```
npx prisma migrate dev --name init
```

This will:
    Create the necessary database tables.
    Track the migration history.

Generate the Prisma Client: Run the following command to generate the Prisma Client, which will allow you to interact with the database in your code.

```
npx prisma generate
```

```
npm run dev
```

