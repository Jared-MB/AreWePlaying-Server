import { addDay, format, parse } from '@formkit/tempo';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Resend } from 'resend';
import { NotificationRepository } from '../repositories/notification.repository';

const EVERY_DAY_AT_9_AM = '0 9 * * *';

@Injectable()
export class NotificationService {
  private readonly resend = new Resend(process.env.RESEND_API_KEY);

  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  @Cron(EVERY_DAY_AT_9_AM)
  async sendNotifications() {
    const today = format(new Date(), 'short');
    const matches = await this.notificationRepository.getByDateRange(
      addDay(parse(today, 'short'), 1),
      addDay(parse(today, 'short'), 2),
    );

    const emails = matches.map(async (match) => {
      await this.resend.emails.send({
        from: 'onboarding@resend.dev',
        to: match.user.email,
        subject: `AreWePlaying? Yes!!!!!!!`,
        html: `<main style="font-family: sans-serif; padding-left: 4rem; padding-right: 4rem;">
                <h1 style="color: #9f7aea; font-weight: 500;">AreWePlaying? Yes!!!!</h1>
                <hr />
                <div>
                  <section style="display: flex; flex-direction: row; gap: 1.5rem; align-items: center;">
                    <img src="${match.match.localTeam.logo}" width="100" height="100" alt="Local Logo" />
                    <span style="font-size: 1.5rem;">vs</span>
                    <img src="${match.match.visitorTeam.logo}" width="100" height="100" alt="Visitor Logo" />
                  </section>
                  <h2 style="font-weight: 400;">${match.match.localTeam.name} vs ${match.match.visitorTeam.name}</h2>
                  <footer style="display: flex; flex-direction: row; align-items: center; gap: 2rem;">
                    <small>${format(match.match.date, 'DD/MM/YYYY h:mm a')}</small>
                    <a
                      target="_blank"
                      href="https://www.google.com/maps/search/?api=1&query=${match.match.location}"
                      style="color: #9f7aea; text-decoration: none;"
                    >
                      ${match.match.location}
                    </a>
                  </footer>
                </div>
              </main>
              `,
      });
    });

    await Promise.all(emails);
  }
}
