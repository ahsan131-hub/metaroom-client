const getCoverPhoto = (photo: string): string => {
  if (photo === 'Engineering') {
    return '/assets/categories/engineering.jpg';
  }
  if (photo === 'Business') {
    return '/assets/categories/business.jpg';
  }
  if (photo === 'Science') {
    return '/assets/categories/science.jpg';
  }
  if (photo === 'Arts') {
    return '/assets/categories/arts.jpg';
  }
  if (photo === 'Mathematics') {
    return '/assets/categories/mathematics.jpg';
  }
  if (photo === 'Social Science') {
    return '/assets/categories/social-science.jpg';
  }
  if (photo === 'Language') {
    return '/assets/categories/language.jpg';
  }
  if (photo === 'Health') {
    return '/assets/categories/health.jpg';
  }
  if (photo === 'Computer Science') {
    return '/assets/categories/computer-science.jpg';
  }
  if (photo === 'Finance') {
    return '/assets/categories/finance.jpg';
  }
  return '';
};
export { getCoverPhoto };
