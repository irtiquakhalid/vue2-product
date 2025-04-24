<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
const APP_VERSION = process.env.VUE_APP_VERSION || "0.0.0";

export default {
  name: "App",

  mounted() {
    this.checkVersion();
  },

  methods: {
    checkVersion() {
      const storedVersion = localStorage.getItem("app_version");

      if (storedVersion && storedVersion !== APP_VERSION) {
        this.clearCacheAndReload();
      } else {
        localStorage.setItem("app_version", APP_VERSION);
      }
    },

    clearCacheAndReload() {
      console.log("🚀 New version detected! Clearing cache and reloading...");

      // ✅ Clear Local Storage & Session Storage
      localStorage.clear();
      sessionStorage.clear();

      // ✅ Clear IndexedDB
      if (window.indexedDB) {
        window.indexedDB.databases().then((databases) => {
          databases.forEach((db) => window.indexedDB.deleteDatabase(db.name));
        });
      }

      // ✅ Clear Service Workers Cache
      if ("caches" in window) {
        caches.keys().then((names) => {
          names.forEach((name) => caches.delete(name));
        });
      }

      // ✅ Unregister Service Workers
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          registrations.forEach((registration) => registration.unregister());
        });
      }

      // ✅ Store New Version & Hard Reload
      localStorage.setItem("app_version", APP_VERSION);
      window.location.reload(); // Hard reload
    },
  },
};
</script>
