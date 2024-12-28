import toast from 'react-hot-toast';
import schools from './schools';

export const categories = [
  // {
  //   value: 'ALL',
  //   icon: 'fa-solid fa-cart-shopping',
  //   label: 'All Categories',
  // },  
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
  const isValidLocation = schools.find((school) => school.value === value);
  if (isValidLocation) {
    return isValidLocation.label
  }
  return "All Universities"
}

export const findCategoryLabel = (category) => {
  if (category === 'all') return 'All Categories'
  else if (category === 'phone'.toUpperCase()) return 'Mobile Phones'
  else if (category === 'computer'.toUpperCase()) return 'Laptop and Accessories'
  else if (category === 'car'.toUpperCase()) return 'Cars'
  else if (category === 'bike'.toUpperCase()) return 'Bikes'
  else if (category === 'furniture'.toUpperCase()) return 'Furnitures'
  else if (category === 'pet'.toUpperCase()) return 'Pets'
  else if (category === 'book'.toUpperCase()) return 'Book'
  else if (category === 'fashion'.toUpperCase()) return 'Fashion'
  else if (category === 'accommodation'.toUpperCase()) return 'Accommodation'
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
  if (alertType === 'success') return toast.success(alertText);
  else if (alertType === 'loading') return toast.loading(alertText);
  else return toast.error(alertText);
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