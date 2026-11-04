import { Contractor } from '../domain/models/incident.model';

export const CONTRACTORS: readonly Contractor[] = [
  {
    id: 'c-plombex', name: 'Plombex Services', phone: '+221 77 540 12 98',
    trades: ['Plomberie'], areas: 'Plateau, Médina',
    rating: 4.8, jobsCompleted: 38, averageLeadTimeLabel: '1,6 j', status: 'available', avatarPalette: 3,
  },
  {
    id: 'c-froid', name: 'Froid Services', phone: '+221 78 220 33 40',
    trades: ['Climatisation', 'Électroménager'], areas: 'Almadies, Ngor',
    rating: 4.6, jobsCompleted: 24, averageLeadTimeLabel: '2,1 j', status: 'onSite', avatarPalette: 1,
  },
  {
    id: 'c-cle-dor', name: "Clé d'Or Dakar", phone: '+221 76 117 08 21',
    trades: ['Serrurerie'], areas: 'Tout Dakar',
    rating: 4.9, jobsCompleted: 17, averageLeadTimeLabel: '0,8 j', status: 'available', avatarPalette: 4,
  },
  {
    id: 'c-btp-ndiaye', name: 'BTP Ndiaye & Fils', phone: '+221 77 904 56 10',
    trades: ['Maçonnerie', 'Étanchéité'], areas: 'Dakar, Rufisque',
    rating: 4.3, jobsCompleted: 12, averageLeadTimeLabel: '5,4 j', status: 'onSite', avatarPalette: 2,
  },
  {
    id: 'c-electro', name: 'Électro Sénégal', phone: '+221 70 818 44 27',
    trades: ['Électricité'], areas: 'Mermoz, Point E',
    rating: 4.7, jobsCompleted: 29, averageLeadTimeLabel: '1,2 j', status: 'available', avatarPalette: 5,
  },
  {
    id: 'c-peinture-pro', name: 'Peinture Pro Dakar', phone: '+221 77 363 90 05',
    trades: ['Peinture'], areas: 'Tout Dakar',
    rating: 4.4, jobsCompleted: 9, averageLeadTimeLabel: '3,0 j', status: 'unavailable', avatarPalette: 6,
  },
];
