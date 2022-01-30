/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { MailerConfig } from 'config/mailer.config';

@Injectable()
export default class MailerService {
  async sendEmail(email: string, body: string) {
    const Oauth2 = new google.auth.OAuth2(
      MailerConfig.CLIENT_ID,
      MailerConfig.CLIENT_SECRET,
      MailerConfig.REDIRECT_URL,
    );
    Oauth2.setCredentials({ refresh_token: MailerConfig.REFRESH_TOKEN });

    try {
      const accessToken = await Oauth2.getAccessToken();

      const transtort = nodemailer.createTransport({
        service: 'Gmail',
        port: 587,
        secure: false,
        auth: {
          type: 'OAuth2',
          user: 'perionicavasic2018@gmail.com',
          clientId: MailerConfig.CLIENT_ID,
          clientSecret: MailerConfig.CLIENT_SECRET,
          refreshToken: MailerConfig.REFRESH_TOKEN,
          accessToken: accessToken as any,
        },
        tls: { rejectUnauthorized: false },
      });

      const mailerOptions = {
        from: 'perionicavasic2018@google.com',
        to: email,
        subject: 'Perionica Vasic <perionicavasic2018@google.com>',
        encoding: 'UTF-8',
        html: body,
      };

      return await transtort.sendMail(mailerOptions);
    } catch (error) {
      return error;
    }
  }
}
