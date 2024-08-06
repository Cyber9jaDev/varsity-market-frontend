import toast from 'react-hot-toast';
import schools from './schools';

export const categories = [
  {
    value: 'ALL',
    icon: 'fa-solid fa-cart-shopping',
    label: 'All Categories',
  },  
  {
    value: 'PHONE',
    icon: 'fa-solid fa-mobile-screen-button',
    label: 'Mobile Phones',
  },
  {
    value: 'LAPTOP',
    icon: 'fa-solid fa-laptop',
    label: 'Laptop and Accessories'
  },
  {
    value: 'CAR',
    icon: 'fa-solid fa-car',
    label: 'Cars'
  },
  {
    value: 'BIKE',
    icon: 'fa-solid fa-motorcycle',
    label: 'Bikes'
  },
  {
    value: 'FURNITURE',
    icon: 'fa-solid fa-chair',
    label: 'Furnitures'
  },
  {
    value: 'PET',
    icon: 'fa-solid fa-paw',
    label: 'Pets'
  },
  {
    value: 'BOOK',
    icon: 'fa-solid fa-book',
    label: 'Books'
  },
  {
    value: 'FASHION',
    icon: 'fa-solid fa-shirt',
    label: 'Fashion'
  },
  {
    value: 'ACCOMMODATION',
    icon: 'fa-solid fa-home',
    label: 'Accommodation'
  },
]

export const findCategory = (value, values) => {
  const category = categories.find((category) => category.value === value);
  if (category) {
    return category;
  }
  return values.defaultCategory;
};

export const findSchool = (value, values) => {
  const school = schools.find((school) => school.value === value);
  if (school) {
    return school
  }
  return values.defaultSchool;
}

export const findSchoolByCode = (value) => {
  const school = schools.find((school) => school.value === value);
  if (school) {
    return school.label
  }
  return { label: "", value: "" }
}

export const findCategoryLabel = (category) => {
  if (category === 'all') return 'All Categories'
  else if (category === 'mobile') return 'Mobile Phones'
  else if (category === 'mobile') return 'Mobile Phones'
  else if (category === 'computer') return 'Laptop and Accessories'
  else if (category === 'car') return 'Cars'
  else if (category === 'bike') return 'Bikes'
  else if (category === 'furniture') return 'Furnitures'
  else if (category === 'pet') return 'Pets'
  else if (category === 'book') return 'Book'
  else if (category === 'fashion') return 'Fashion'
  else if (category === 'accommodation') return 'Accommodation'
};

export const convertDate = (date) => {
  return {
    date: new Date(date).toDateString(),
    time: new Date(date).toLocaleTimeString(),
  };
};

export const orderBy = [
  {
    label: 'Price: Low to High',
    value: 'asc',
  },
  {
    label: 'Price: High to Low',
    value: 'desc'
  }
]

export const displayAlert = (alertType, alertText) => {
  if (alertType === 'success') toast.success(alertText);
  else if (alertType === 'error') toast.error(alertText);
}

export const refresh = () => {
  return window.location.reload();
}

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN'
  }).format(amount);
}

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString();
}