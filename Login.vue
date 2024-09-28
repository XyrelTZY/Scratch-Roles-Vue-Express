<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-96">
      <h2 class="text-2xl font-bold text-center mb-6">Login</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <input
            v-model="username"
            type="text"
            placeholder="Username"
            required
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div class="mb-4">
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            required
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:5000/api/login', {
          username: this.username,
          password: this.password,
        });
        
        // Store the token and role in local storage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);
        
        // Redirect based on the user role
        this.$router.push(`/${response.data.role}`);
      } catch (error) {
        // Handle errors properly
        const errorMessage = error.response ? error.response.data : 'An error occurred';
        console.error('Login failed:', errorMessage);
        alert(errorMessage); // Display an alert for feedback
      }
    },
  },
};
</script>
