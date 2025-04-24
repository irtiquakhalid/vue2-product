<template>
  <div
    style="
      max-width: 600px;
      margin: 20px auto;
      background: #fff;
      border: 3px solid #2bc2c2;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    "
  >
    <!-- Logo Section -->
    <div style="text-align: center; margin-bottom: 20px">
      <img
        src="https://tse1.mm.bing.net/th?id=OIP.vpUUrAb6H7eMCIM4TRzpcAHaFj&pid=Api&P=0&h=220"
        alt="Logo"
        style="max-width: 100px"
      />
    </div>

    <!-- Welcome Message -->
    <p style="font-size: 16px; color: #333">Hello {{ recipientName }},</p>
    <p style="font-size: 14px; color: #555; line-height: 1.6">
      We’ve created a property checklist to keep you fully informed throughout
      the process. By monitoring each step along the way, you can easily see how
      close the checklist is to meeting its final completion. Please let me know
      if there’s anything I can do for you!
    </p>

    <!-- Contact Info -->
    <p style="font-size: 14px; color: #333; margin-top: 20px">
      If you have any questions, please don’t hesitate to reach out.
    </p>
    <p style="font-size: 14px; color: #333; margin-bottom: 20px">Thank you,</p>

    <!-- Property Details -->
    <div style="max-width: 100%; display: flex; justify-content: space-evenly">
      <div
        class="property-info"
        style="
          max-width: 50%;
          display: flex;
          flex-direction: column;
          justify-content: left;
        "
      >
        <strong
          v-for="(value, key) in propertyDetails"
          :key="key"
          style="font-size: 14px; color: #2bc2c2; margin: 5px 0"
          >{{ key }}:</strong
        >
      </div>
      <div
        class="property-info"
        style="
          max-width: 50%;
          display: flex;
          flex-direction: column;
          justify-content: left;
        "
      >
        <p
          v-for="(value, key) in propertyDetails"
          :key="key"
          style="font-size: 14px; color: #555; margin: 5px 0"
        >
          {{ value }}
        </p>
      </div>
    </div>

    <!-- Checklist -->
    <div style="padding-top: 20px">
      <table
        class="tablestyle"
        style="max-width: 800px; display: flex; justify-content: center"
      >
        <tbody style="display: flex; flex-direction: column">
          <tr
            v-for="(item, index) in checklist"
            :key="index"
            style="background-color: #eeeced; margin: 3px"
          >
            <td style="text-align: center">
              <input type="checkbox" v-model="item.completed" />
            </td>
            <td
              style="
                font-size: 14px;
                color: #2bc2c2;
                padding: 8px 0;
                margin: 0px 20px;
              "
            >
              {{ item.task }}
            </td>
            <td
              style="font-size: 14px; color: rgb(49, 47, 47); text-align: right"
            >
              {{ item.date }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p style="font-size: 14px; color: #555; line-height: 1.6">
      We’ve created a property checklist to keep you fully informed throughout
      the process. By monitoring each step along the way, you can easily see how
      close the checklist is to meeting its final completion. Please let me know
      if there’s anything I can do for you!
    </p>
    <p>BYEBYE</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        recipientName: "CB Wenda",
        propertyDetails: {
          Property: "19203 S Ocean Dr, Jensen Beach, FL",
          Buyer: "CB Mendoza",
          Seller: "Jason Ortega",
          "Escrow Agent": "Nancy James",
          Attorney: "Christopher Jacob",
        },
        checklist: [
          { task: "Effective Date", date: "01/02/2024", completed: false },
          { task: "Escrow Deposit", date: "01/05/2024", completed: false },
          { task: "Loan Application", date: "01/08/2024", completed: false },
        ],
      };
    },
  };
</script>

<style scoped>
  .checkbox-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 15px;
  }

  .checkbox-container label {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #333;
  }

  .checkbox-container input[type="checkbox"] {
    margin-right: 10px;
    width: 20px;
    height: 20px;
    background-color: #d3d3d3;
    border: 2px solid #2bc2c2;
  }

  .checkbox-container input[type="checkbox"]:checked {
    background-color: #2bc2c2;
  }
</style>
