import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Scheme {
  name: string;
  description: string;
  crop: string;
  state: string;
  category: 'Loan' | 'Insurance' | 'Subsidy';
  link: string;
}

@Component({
  selector: 'app-schemes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './schemes.html',
  styleUrls: ['./schemes.css']
})
export class SchemesComponent {

  // Dropdown options
  crops: string[] = ['All', 'Wheat', 'Rice', 'Cotton', 'Sugarcane'];
  states: string[] = ['All', 'Maharashtra', 'Punjab', 'Gujarat', 'Karnataka'];
  categories: Array<'Loan' | 'Insurance' | 'Subsidy'> = [
    'Loan',
    'Insurance',
    'Subsidy'
  ];

  // Selected filters
  filters = {
    crop: 'All',
    state: 'All',
    category: ''
  };

  // Government schemes data (can be replaced by API later)
  schemes: Scheme[] = [
  {
    name: 'PM Kisan Samman Nidhi',
    description: '₹6000 per year income support to eligible farmer families.',
    crop: 'All',
    state: 'All',
    category: 'Subsidy',
    link: 'https://pmkisan.gov.in'
  },
  {
    name: 'Pradhan Mantri Fasal Bima Yojana',
    description: 'Crop insurance against natural calamities, pests, and diseases.',
    crop: 'All',
    state: 'All',
    category: 'Insurance',
    link: 'https://pmfby.gov.in'
  },
  {
    name: 'Kisan Credit Card',
    description: 'Short-term credit support for cultivation and allied activities.',
    crop: 'All',
    state: 'All',
    category: 'Loan',
    link: 'https://www.myscheme.gov.in'
  },
  {
    name: 'Soil Health Card Scheme',
    description: 'Provides soil health cards with crop-wise fertilizer advice.',
    crop: 'All',
    state: 'All',
    category: 'Subsidy',
    link: 'https://soilhealth.dac.gov.in'
  },
  {
    name: 'PM Krishi Sinchayee Yojana',
    description: 'Financial support for irrigation systems and water conservation.',
    crop: 'All',
    state: 'All',
    category: 'Subsidy',
    link: 'https://pmksy.gov.in'
  },
  {
    name: 'National Agriculture Market (e-NAM)',
    description: 'Online trading platform for better price discovery of crops.',
    crop: 'All',
    state: 'All',
    category: 'Subsidy',
    link: 'https://www.enam.gov.in'
  },
  {
    name: 'Paramparagat Krishi Vikas Yojana',
    description: 'Promotes organic farming with financial assistance.',
    crop: 'Organic',
    state: 'All',
    category: 'Subsidy',
    link: 'https://pgsindia-ncof.gov.in'
  },
  {
    name: 'Rashtriya Krishi Vikas Yojana',
    description: 'State-specific agriculture development and innovation support.',
    crop: 'All',
    state: 'All',
    category: 'Subsidy',
    link: 'https://rkvy.nic.in'
  },
  {
    name: 'National Livestock Mission',
    description: 'Financial assistance for livestock and poultry farmers.',
    crop: 'Livestock',
    state: 'All',
    category: 'Subsidy',
    link: 'https://nlm.udyamimitra.in'
  },
  {
    name: 'PM Kisan Maandhan Yojana',
    description: 'Pension scheme for small and marginal farmers after 60 years.',
    crop: 'All',
    state: 'All',
    category: 'Insurance',
    link: 'https://maandhan.in'
  }
];


  // Filter logic
  filteredSchemes(): Scheme[] {
    return this.schemes.filter(scheme =>
      (this.filters.crop === 'All' || scheme.crop === 'All' || scheme.crop === this.filters.crop) &&
      (this.filters.state === 'All' || scheme.state === 'All' || scheme.state === this.filters.state) &&
      (!this.filters.category || scheme.category === this.filters.category)
    );
  }
}
