import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task/task.entity';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { User } from './entities/user/user.entity';
import { OrganizationModule } from './organization/org.module';
import { Organization } from './entities/organization/organization.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TaskModule,
    UserModule,
    OrganizationModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'taskmanager',
      autoLoadEntities: true,
      synchronize: true, // use only in dev
    }),
    TypeOrmModule.forFeature([Task, User, Organization]),  // Import Task entity here

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
