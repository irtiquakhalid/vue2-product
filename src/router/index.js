import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: "/onboardingscreen",
  },
  {
    path: "/",
    name: "/",
    component: () => import("../Layouts/AuthLayout.vue"),
    redirect: "/onboardingscreen",
    children: [
      {
        path: "/signup",
        name: "signup",
        component: () => import("../views/auth/signup.vue"),
      },
      {
        path: "/passkey",
        name: "passkey",
        component: () => import("../views/auth/passkey.vue"),
      },
    ],
  },
  {
    path: "/dashboard",
    component: () => import("../Layouts/AdminLayout.vue"),
    redirect: "/team",
    children: [
      {
        path: "/team",
        name: "team",
        component: () => import("../views/team/index.vue"),
      },
      {
        path: "/team/teamprofile",
        name: "teamprofile",
        component: () => import("../views/team/teamprofile.vue"),
      },
      {
        path: "/checklist",
        name: "checklist",
        component: () => import("../views/checklist/index.vue"),
      },
      {
        path: "/checklist/contract",
        name: "checklistContract",
        component: () => import("../views/checklist/contract.vue"),
      },
      {
        path: "/checklist/editcontract",
        name: "editchecklistContract",
        component: () => import("../views/checklist/editcontract.vue"),
      },
      {
        path: "/checklist/user",
        component: () => import("../views/checklist/user.vue"),
      },
      {
        path: "/notification",
        component: () => import("../views/notification/index.vue"),
      },
      {
        path: "/template",
        name: "template",
        component: () => import("../views/template/index.vue"),
      },
      {
        path: "/template/tasks",
        name: "temptasks",
        component: () => import("../views/template/tasks.vue"),
      },
      {
        path: "/member",
        name: "member",
        component: () => import("../views/member/index.vue"),
      },
      {
        path: "/chats",
        name: "chats",
        component: () => import("../views/chats/index.vue"),
      },
    ],
  },
  {
    path: "/checklist/readonly/:contractId",
    name: "readonlycontract",
    component: () => import("../views/checklist/readonlycontract.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/profile/index.vue"),
  },
  {
    path: "/profile/changeplan",
    name: "changeplan",
    component: () => import("../views/profile/changeplan.vue"),
  },
  {
    path: "/onboardingscreen",
    name: "onboardingscreen",
    component: () => import("../views/onboardingscreen/index.vue"),
  },
  {
    path: "/payment",
    name: "payment",
    component: () => import("../views/onboardingscreen/payment.vue"),
  },
  {
    path: "/payment/paymenttype",
    name: "paymenttype",
    component: () => import("../views/onboardingscreen/paymenttype.vue"),
  },
  {
    path: "/uploadimage",
    name: "uploadimage",
    component: () => import("../views/onboardingscreen/uploadimage.vue"),
  },
  {
    path: "/color",
    name: "color",
    component: () => import("../views/onboardingscreen/color.vue"),
  },
  {
    path: "/pushnotification",
    name: "pushnotification",
    component: () => import("../views/onboardingscreen/notification.vue"),
  },
  {
    path: "/peopleyouknow",
    name: "peopleyouknow",
    component: () => import("../views/onboardingscreen/peopleyouknow.vue"),
  },
  {
    path: "/hereaboutus",
    name: "hereaboutus",
    component: () => import("../views/onboardingscreen/hereaboutus.vue"),
  },
  {
    path: "/generalcontract",
    name: "generalcontract",
    component: () => import("../views/GlobalLink/index.vue"),
  },
  {
    path: "/sendrequests",
    name: "sendrequests",
    component: () => import("../views/onboardingscreen/SendRequests.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
let previousRoute = null;
router.beforeEach((to, from, next) => {
  previousRoute = from;
  const access_token = localStorage.getItem("userToken");
  const alreadyExist = localStorage.getItem("alreadyExist");
  const skipPayment = localStorage.getItem("skipPayment");
  const organizationId = localStorage.getItem("organizationId");

  // Public routes that don't require authentication
  const publicRoutes = [
    "onboardingscreen",
    "signup",
    "passkey",
    "readonlycontract", // Add this to public routes
  ];

  const redirectRoutes = [
    "team",
    "onboardingscreen",
    "signup",
    "passkey",
    "color",
    "pushnotification",
    "peopleyouknow",
    "hereaboutus",
    "member",
    "template",
    "temptasks",
    "checklistContract",
    "teamprofile",
    "editchecklistContract",
  ];

  // Check if the route is public
  if (publicRoutes.includes(to.name)) {
    return next(); // Allow access to public routes
  }

  if (access_token) {
    if (alreadyExist === "yes" && !skipPayment) {
      if (
        [
          "onboardingscreen",
          "signup",
          "payment",
          "passkey",
          "paymenttype",
        ].includes(to.name)
      ) {
        next({ name: "team" });
      } else {
        next();
      }
    } else {
      if (skipPayment) {
        if (redirectRoutes.includes(to.name)) {
          next({ name: "checklist" });
        } else {
          next();
        }
      } else if (alreadyExist === "no") {
        if (
          [
            "onboardingscreen",
            "signup",
            "passkey",
            "payment",
            "paymenttype",
          ].includes(to.name)
        ) {
          next();
        } else {
          next({ name: "payment" });
        }
      }
    }
  } else {
    // If no access token and trying to access non-public route
    next({ name: "onboardingscreen" });
  }
});

Vue.prototype.$getPreviousRoute = () => previousRoute;
export default router;
