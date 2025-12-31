import { Component } from '@angular/core';

type Feature = {
  title: string;
  description: string;
  icon: string; // emoji placeholder so you don’t have to install icon libraries
};

type Activity = {
  title: string;
  detail: string;
  time: string;
  status: 'Success' | 'Pending' | 'Info';
};

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  constructor() { }

   year = new Date().getFullYear();

  stats = {
    openItems: 18,
    dueSoon: 5,
    completed: 42,
    sla: 96
  };

  features: Feature[] = [
    { icon: '📦', title: 'Work Items', description: 'Track stuff. Pretend it’s a process. Enjoy the illusion of control.' },
    { icon: '📊', title: 'Reports', description: 'Charts that look serious, even when the data is “demo.”' },
    { icon: '🧑‍🤝‍🧑', title: 'Teams', description: 'Assign ownership so problems feel shared and therefore smaller.' },
    { icon: '🔒', title: 'Security', description: 'Buttons and labels that suggest compliance. Actual compliance sold separately.' },
  ];

  activity: Activity[] = [
    { title: 'Sync completed', detail: 'Pulled updates from upstream systems.', time: '2m ago', status: 'Success' },
    { title: '3 items flagged', detail: 'Due dates approaching in Procurement queue.', time: '18m ago', status: 'Pending' },
    { title: 'New dashboard published', detail: 'Ops view v1 is now available.', time: '1h ago', status: 'Info' },
    { title: 'Export generated', detail: 'Report_2025-12-30.pdf created.', time: '3h ago', status: 'Success' },
  ];

}
