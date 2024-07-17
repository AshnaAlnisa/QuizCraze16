// localStorageHelper.js

export const saveUser = (user) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  };
  
  export const getUser = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.find(user => user.email === email && user.password === password);
  };
  
  export const saveQuiz = (quiz) => {
    const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    quizzes.push(quiz);
    localStorage.setItem('quizzes', JSON.stringify(quizzes));
  };
  
  export const getQuizzes = () => {
    return JSON.parse(localStorage.getItem('quizzes')) || [];
  };
  
  export const saveCurrentUser = (user) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
  };
  
  export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('currentUser'));
  };
  
  export const saveQuizResult = (result) => {
    const results = JSON.parse(localStorage.getItem('results')) || [];
    results.push(result);
    localStorage.setItem('results', JSON.stringify(results));
  };
  
  export const getQuizResults = (userId) => {
    const results = JSON.parse(localStorage.getItem('results')) || [];
    return results.filter(result => result.userId === userId);
  };
  