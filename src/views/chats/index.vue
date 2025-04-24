<template>
  <div class="chats">
    <loadercomponent :loader="loader" />
    <v-card
      height="100%"
      width="100%"
      elevation="3"
      class="radius-25"
      style="padding-bottom: 0px"
    >
      <v-row width="80%">
        <v-col cols="5" class="pl-12 pt-6">
          <!-- Search  Input for single chat -->
          <v-text-field
            v-model="search"
            solo
            flat
            v-if="singleChatOption"
            background-color="var(--secondary-color)"
            class="radius-7"
            hide-details
            placeholder="Search member"
            @input="fetchdata"
          >
            <template v-slot:prepend-inner>
              <v-img src="/images/search.svg" class="px-3" contain></v-img>
            </template>
          </v-text-field>
          <!-- Search  Input for Group chat -->
          <v-text-field
            v-model="search"
            solo
            v-if="groupChatOption"
            flat
            background-color="var(--secondary-color)"
            class="radius-7"
            hide-details
            placeholder="Search Group"
            @input="fetchdata"
          >
            <template v-slot:prepend-inner>
              <v-img src="/images/search.svg" class="px-3" contain></v-img>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="6"></v-col>
      </v-row>
      <!---------single chat------------>
      <v-row v-if="!groupchatBox" style="height: 100%">
        <!-- Left: Chat Cards -->

        <v-col cols="5" class="pl-12 pb-12 h-100">
          <div class="pt-1" style="height: 96%">
            <v-card height="95%" class="radius-25" elevation="3">
              <div class="d-flex align-center justify-space-between ml-8">
                <div class="d-flex align-center">
                  <v-chip
                    @click="
                      () => {
                        groupChatOption = false;
                        singleChatOption = true;
                        this.fetchdata();
                      }
                    "
                    :color="singleChatOption ? 'var(--primary-color)' : ''"
                    :text-color="singleChatOption ? 'white' : ''"
                    class="py-2 black--text cursor-pointer mt-4"
                  >
                    <span style="cursor: pointer"> All Chats </span></v-chip
                  >
                  <v-chip
                    :color="groupChatOption ? 'var(--primary-color)' : ''"
                    :text-color="groupChatOption ? 'white' : ''"
                    @click="
                      () => {
                        groupChatOption = true;
                        singleChatOption = false;
                        this.fetchdata();
                      }
                    "
                    class="py-2 black--text ml-3 cursor-pointer mt-4"
                  >
                    <span style="cursor: pointer"> Group Chats</span>
                  </v-chip>
                </div>
                <v-chip
                  v-if="groupChatOption"
                  style="border: 1px solid var(--primary-color)"
                  text-color="black"
                  @click="editGroupInfoDialog({}, 'New')"
                  class="py-2 black--text mr-7 cursor-pointer mt-4"
                >
                  <span style="cursor: pointer">Create Group</span>
                </v-chip>
              </div>
              <!---------Single chat--------------->
              <div v-if="singleChatOption" class="h-100">
                <div
                  class="chatscroll"
                  style="height: 90%"
                  v-if="filteredMembers.length > 0"
                >
                  <!-- Loop through filteredMembers instead of filteredMembers -->
                  <div
                    v-for="member in filteredMembers"
                    :key="member.id"
                    style="
                      position: relative;
                      margin-left: 0.4rem;
                      margin-top: 1rem;
                    "
                    :class="{
                      'highlighted-chat': member.id === selectedChat?.id,
                    }"
                  >
                    <div
                      @click="selectChat(member), markMessagesAsRead(member.id)"
                      class="d-flex py-4 pl-7 chat-card"
                      style="
                        border-bottom: 1px solid #80808059;
                        cursor: pointer;
                      "
                    >
                      <v-avatar class="ml-0 pl-0" v-if="member.userProfile">
                        <v-img
                          :src="`${imageURL}${member.userProfile}`"
                          class="ml-0 pl-0"
                          style="border: 3px solid var(--primary-color)"
                        ></v-img>
                      </v-avatar>
                      <v-avatar
                        v-else
                        style="border: 3px solid var(--primary-color)"
                      >
                        <v-img
                          src="/images/singleuser.png"
                          max-width="30"
                          contain
                        ></v-img>
                      </v-avatar>
                      <div
                        class="d-flex justify-space-between"
                        style="width: 100%; position: relative"
                      >
                        <div class="ml-3" style="margin-top: 11px">
                          <span class="font-weight-600">{{
                            member?.name?.length > 30
                              ? `${member.name.slice(0, 30)}...`
                              : member.name || member.email || "\u00A0"
                          }}</span>
                          <!-- <div>{{ member.email }}</div> -->
                        </div>
                        <v-chip
                          v-if="getUnreadCount(member.id) > 0"
                          class="mr-14 mt-3 white--text"
                          small
                          color="var(--primary-color)"
                        >
                          {{ getUnreadCount(member.id) }}
                        </v-chip>
                      </div>
                      <!-- Unread Messages Badge -->
                    </div>
                    <v-icon
                      v-if="!search"
                      @click="deleteChatItem(member)"
                      class="cursor-pointer"
                      style="
                        color: var(--primary-color);
                        position: absolute;
                        right: 4%;
                        top: 34%;
                        z-index: 400;
                      "
                      >mdi-delete</v-icon
                    >
                  </div>
                </div>
              </div>
              <!---------Group chat----------------->
              <div v-if="groupChatOption" class="h-100">
                <div
                  class="chatscroll"
                  style="height: 90%"
                  v-if="GroupChatMembers.length > 0"
                >
                  <!-- Loop through filteredMembers instead of members -->

                  <div
                    v-for="member in GroupChatMembers"
                    :key="member.id"
                    :class="{
                      'highlighted-chat': member.id === selectedChat?.id,
                    }"
                    style="
                      position: relative;
                      margin-left: 0.4rem;
                      margin-top: 1rem;
                    "
                  >
                    <div
                      @click="
                        selectChat(member), markAllAsGroupMessageRead(member.id)
                      "
                      class="d-flex py-4 pl-7 chat-card"
                      style="
                        border-bottom: 1px solid #80808059;
                        cursor: pointer;
                      "
                    >
                      <v-avatar class="ml-0 pl-0" v-if="member.groupImage">
                        <v-img
                          :src="`${imageURL}${member.groupImage}`"
                          class="ml-0 pl-0"
                          style="border: 3px solid var(--primary-color)"
                        ></v-img>
                      </v-avatar>
                      <v-avatar
                        v-else
                        style="border: 3px solid var(--primary-color)"
                      >
                        <v-img
                          src="/images/singleuser.png"
                          max-width="30"
                          contain
                        ></v-img>
                      </v-avatar>
                      <div
                        class="d-flex justify-space-between"
                        style="width: 100%; position: relative"
                      >
                        <div class="ml-3" style="margin-top: 11px">
                          <span class="font-weight-600">{{
                            member?.groupName?.length > 30
                              ? `${member.groupName.slice(0, 30)}...`
                              : member.groupName || member.email || "\u00A0"
                          }}</span>
                        </div>
                        <v-chip
                          v-if="groupUnreadCounts[member.id] > 0"
                          class="mr-14 mt-3 white--text"
                          small
                          color="var(--primary-color)"
                        >
                          {{ groupUnreadCounts[member.id] }}
                        </v-chip>
                      </div>
                    </div>
                    <v-icon
                      v-if="!search"
                      @click="deleteChatItem(member)"
                      class="cursor-pointer"
                      style="
                        color: var(--primary-color);
                        position: absolute;
                        right: 4%;
                        top: 34%;
                        z-index: 400;
                      "
                      >mdi-delete</v-icon
                    >
                  </div>
                </div>
              </div>
              <div
                v-if="filteredMembers.length === 0 && loader == false"
                style="height: 90%; color: var(--primary-color)"
                class="d-flex align-center justify-center font-20 font-weight-600"
              >
                Start Your First Chat By Searching Member
              </div>
            </v-card>
          </div>
        </v-col>

        <!-- Right: Chat Window -->
        <v-col cols="7" class="pl-5 pr-12 pb-12 h-100">
          <div class="pt-1" style="height: 100%">
            <div
              v-if="!selectedChat"
              class="d-flex justify-center h-100 align-center"
            >
              <svg
                width="265"
                height="266"
                viewBox="0 0 265 266"
                border="0px"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.4">
                  <path
                    d="M218.225 196.507L223.393 238.379C224.718 249.377 212.925 257.063 203.517 251.365L157.67 224.069C154.489 222.214 153.694 218.238 155.417 215.058C162.042 202.868 165.62 189.087 165.62 175.306C165.62 126.809 124.013 87.3219 72.8654 87.3219C62.3974 87.3219 52.1944 88.9119 42.6539 92.0921C37.7511 93.6822 32.9809 89.177 34.1735 84.1417C46.2316 35.9093 92.6089 0 147.997 0C212.66 0 265 48.8949 265 109.185C265 144.962 246.582 176.631 218.225 196.507Z"
                    fill="var(--primary-color)"
                  />
                  <path
                    d="M145.757 175.382C145.757 191.15 139.927 205.726 130.121 217.254C117.003 233.155 96.1998 243.358 72.8786 243.358L38.2944 263.896C32.4641 267.474 25.0438 262.571 25.8388 255.813L29.1515 229.71C11.3956 217.386 0 197.643 0 175.382C0 152.061 12.4556 131.522 31.5366 119.332C43.3297 111.646 57.5079 107.273 72.8786 107.273C113.161 107.273 145.757 137.75 145.757 175.382Z"
                    fill="var(--primary-color)"
                  />
                </g>
              </svg>
            </div>
            <div v-else class="h-100">
              <v-card
                class="radius-25"
                elevation="3"
                style="
                  position: relative;
                  display: flex;
                  flex-direction: column;
                  height: 90.9%;
                "
              >
                <div
                  style="
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 3000;
                    background-color: #19191a12;
                    padding: 20px;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 20px;
                  "
                  v-if="chatLoader"
                >
                  <v-progress-circular
                    indeterminate
                    color="var(--primary-color)"
                  ></v-progress-circular>
                </div>
                <!-- Chat header -->
                <div
                  class="d-flex justify-space-between py-5"
                  style="
                    width: 100%;
                    background-color: var(--secondary-color);
                    padding: 10px;
                  "
                >
                  <div class="d-flex align-center">
                    <v-avatar class="ml-5 pl-0" v-if="selectedChat.userProfile">
                      <v-img
                        :src="`${imageURL}${selectedChat.userProfile}`"
                        style="border: 3px solid var(--primary-color)"
                      ></v-img>
                    </v-avatar>
                    <v-avatar class="ml-5 pl-0" v-if="selectedChat.groupImage">
                      <v-img
                        :src="`${imageURL}${selectedChat.groupImage}`"
                        style="border: 3px solid var(--primary-color)"
                      ></v-img>
                    </v-avatar>
                    <v-avatar
                      class="ml-5"
                      v-if="
                        !selectedChat.userProfile && !selectedChat.groupImage
                      "
                      style="border: 3px solid var(--primary-color)"
                    >
                      <v-img
                        src="/images/singleuser.png"
                        max-width="30"
                        contain
                      ></v-img>
                    </v-avatar>

                    <h5 class="ml-5 pl-0" v-if="selectedChat.name">
                      {{
                        selectedChat?.name?.length > 30
                          ? `${selectedChat.name.slice(0, 30)}...`
                          : selectedChat.name || selectedChat.email
                      }}
                    </h5>
                    <h5 class="ml-5 pl-0" v-else>
                      {{
                        selectedChat?.groupName?.length > 30
                          ? `${selectedChat.groupName.slice(0, 30)}...`
                          : selectedChat.groupName || selectedChat.email
                      }}
                    </h5>
                  </div>
                  <div
                    class="d-flex align-center"
                    v-if="selectedChat.groupName"
                  >
                    <v-chip
                      @click="
                        (addGroupMemberDialog = true), getGroupMemberById()
                      "
                      style="
                        border: 1px solid var(--primary-color);
                        cursor: pointer;
                      "
                      text-color="black"
                      >Add Member</v-chip
                    >
                    <v-icon
                      color="var(--primary-color)"
                      class="mx-4"
                      large
                      @click="
                        (openGroupInfoDrawer = true), getGroupMemberById()
                      "
                      >mdi-information-variant-circle</v-icon
                    >
                  </div>
                </div>
                <div style="height: 80%">
                  <!-- Chat messages -->
                  <div
                    class="chatscroll ml-6 mr-3"
                    style="flex-grow: 1; overflow-y: auto"
                    ref="container"
                  >
                    <div
                      v-for="(msg, index) in chatMessages"
                      :key="index"
                      class="d-flex py-2 mr-3 flex-column"
                      :class="{
                        'align-right': msg.isMine,
                        'align-start': !msg.isMine,
                      }"
                    >
                      <v-card
                        :class="['message-card', { 'my-message': msg.isMine }]"
                        :style="{
                          'background-color': msg.isMine
                            ? '#FDF4F4'
                            : '#F7F7F7',
                          width:
                            msg.type === 'image' || msg.type === 'document'
                              ? '40%'
                              : 'auto',
                        }"
                      >
                        <div style="max-height: 200px" v-if="msg.imageUrl">
                          <a :href="msg.imageUrl" download target="_blank">
                            <v-img
                              :src="msg.imageUrl"
                              max-width="200px"
                              max-height="200px"
                              cover
                              class="cursor-pointer"
                            ></v-img>
                          </a>
                        </div>
                        <v-card
                          class="d-flex justify-space-between align-center"
                          v-if="msg.documentUrl"
                        >
                          <v-card-title class="d-flex align-center">
                            <v-icon
                              class="mr-2"
                              color="var(--primary-color)"
                              style="font-size: 30px"
                              >mdi-file-document</v-icon
                            >
                            <span class="font-14">{{
                              getCleanFileName(msg.documentUrl).length > 30
                                ? `${getCleanFileName(msg.documentUrl).slice(
                                    0,
                                    30
                                  )}...`
                                : getCleanFileName(msg.documentUrl)
                            }}</span>
                          </v-card-title>
                          <v-card-actions>
                            <a
                              text
                              :href="msg.documentUrl"
                              download
                              target="_blank"
                            >
                              <v-icon
                                color="var(--primary-color)"
                                style="font-size: 30px"
                                >mdi-download-circle</v-icon
                              >
                            </a>
                          </v-card-actions>
                        </v-card>
                        <div
                          v-if="msg.type !== 'document' && msg.type !== 'image'"
                        >
                          {{ msg.text }}
                        </div>
                      </v-card>
                      <div class="message-time">
                        {{ formatDateAndTime(msg?.timestamp) }}
                      </div>
                    </div>
                  </div>
                  <!-- Input area with send and clip icons -->
                  <div
                    class="chat-input-area mx-6"
                    style="padding: 10px"
                    elevation="5"
                  >
                    <v-row no-gutters v-if="!selectedChat.groupName">
                      <v-text-field
                        v-model="newMessage"
                        placeholder="Enter here"
                        solo
                        append-icon="mdi-paperclip"
                        style="width: 100%; min-height: 70px"
                        @keydown.enter="sendMessage"
                      >
                        <template v-slot:append>
                          <div
                            class="d-flex justify-space-evenly my-2"
                            style="width: 100%"
                          >
                            <v-btn
                              icon
                              @click="openDialog('singlefile')"
                              class="mr-2"
                            >
                              <v-img
                                src="images\chats\Vector.png"
                                max-width="15"
                              ></v-img>
                            </v-btn>
                            <v-btn
                              @click="sendMessage"
                              style="
                                background-color: var(--primary-color);
                                border-radius: 25px;
                              "
                            >
                              <v-img
                                src="images\chats\Vector-1.png"
                                style="border-radius: 5px"
                                max-width="20"
                              ></v-img>
                            </v-btn>
                          </div>
                        </template>
                      </v-text-field>
                    </v-row>
                    <v-row no-gutters v-else>
                      <v-combobox
                        v-model="newGroupMessage"
                        placeholder="Enter group here message"
                        solo
                        append-icon="mdi-paperclip"
                        style="width: 100%; min-height: 70px"
                        @keydown.enter="sendGroupMessage"
                      >
                        <template v-slot:append>
                          <div
                            class="d-flex justify-space-evenly my-2"
                            style="width: 100%"
                          >
                            <v-btn
                              icon
                              @click="openDialog('groupfile')"
                              class="mr-2"
                            >
                              <v-img
                                src="images\chats\Vector.png"
                                max-width="15"
                              ></v-img>
                            </v-btn>
                            <v-btn
                              @click="sendGroupMessage"
                              style="
                                background-color: var(--primary-color);
                                border-radius: 25px;
                              "
                            >
                              <v-img
                                src="images\chats\Vector-1.png"
                                style="border-radius: 5px"
                                max-width="20"
                              ></v-img>
                            </v-btn>
                          </div>
                        </template>
                      </v-combobox>
                    </v-row>
                  </div>
                </div>
              </v-card>
              <!-- Dialog for attachments -->
              <v-dialog v-model="dialog" max-width="400px" persistent>
                <v-card class="pa-4 radius-21">
                  <v-row style="display: flex; justify-content: flex-end">
                    <v-card-title>
                      <v-icon
                        @click="dialog = false"
                        color="var(--primary-color)"
                        style="font-size: 33px"
                        >mdi-close-circle</v-icon
                      >
                    </v-card-title></v-row
                  >
                  <v-card-text>
                    <v-row class="mt-3">
                      <v-col cols="6" class="text-center">
                        <div class="chat-uploadfile">
                          <svg
                            width="87"
                            height="87"
                            viewBox="0 0 77 77"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              cx="38.5"
                              cy="38.5"
                              r="38.5"
                              fill="var(--primary-color)"
                            />
                            <path
                              d="M33.5 54H42.5C50 54 53 51 53 43.5V34.5C53 27 50 24 42.5 24H33.5C26 24 23 27 23 34.5V43.5C23 51 26 54 33.5 54Z"
                              stroke="white"
                              stroke-width="1.7"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M33.5 35.9922C35.1569 35.9922 36.5 34.649 36.5 32.9922C36.5 31.3353 35.1569 29.9922 33.5 29.9922C31.8431 29.9922 30.5 31.3353 30.5 32.9922C30.5 34.649 31.8431 35.9922 33.5 35.9922Z"
                              stroke="white"
                              stroke-width="1.7"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M24.0039 49.4288L31.3989 44.4638C32.5839 43.6688 34.2939 43.7588 35.3589 44.6738L35.8539 45.1088C37.0239 46.1138 38.9139 46.1138 40.0839 45.1088L46.3239 39.7538C47.4939 38.7487 49.3839 38.7487 50.5539 39.7538L52.9989 41.8537"
                              stroke="white"
                              stroke-width="1.7"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          <input
                            class="input-file"
                            type="file"
                            @change="attach('image')"
                            multiple
                            accept="image/*"
                          />
                        </div>
                        <div
                          class="font-weight-500 font-18 black--text text-center"
                        >
                          Photos
                        </div>
                      </v-col>
                      <v-col cols="6" class="text-center">
                        <div class="chat-uploadfile">
                          <svg
                            width="87"
                            height="87"
                            viewBox="0 0 77 77"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              cx="38.5"
                              cy="38.5"
                              r="38.5"
                              fill="var(--primary-color)"
                            />
                            <g clip-path="url(#clip0_3410_10316)">
                              <path
                                d="M54.7492 31.6648L45.3352 22.2507C45.1747 22.0902 44.957 22 44.7299 22H27.8133C24.6078 22 22 24.6078 22 27.8133V49.1868C22 52.3923 24.6078 55.0001 27.8133 55.0001H49.1868C52.3923 55.0001 55.0001 52.3923 55.0001 49.1868V32.27C55 32.043 54.9097 31.8253 54.7492 31.6648ZM45.4432 24.7799L52.22 31.5566H45.4432V24.7799ZM49.1867 53.288H27.8133C25.5519 53.288 23.712 51.4481 23.712 49.1867V27.8133C23.712 25.5519 25.5519 23.712 27.8133 23.712H43.7312V32.4126C43.7312 32.8853 44.1146 33.2686 44.5872 33.2686H53.2878V49.1867C53.288 51.4481 51.4481 53.288 49.1867 53.288Z"
                                fill="white"
                              />
                              <path
                                d="M36.8132 29.4777C35.9761 28.6406 34.8633 28.1797 33.6796 28.1797C32.4959 28.1797 31.3831 28.6406 30.546 29.4777C29.709 30.3147 29.248 31.4275 29.248 32.6112C29.248 33.795 29.709 34.9078 30.546 35.7448L39.3253 44.524C40.4605 45.6591 42.307 45.6588 43.442 44.524C44.5769 43.389 44.5769 41.5424 43.442 40.4073L34.7495 31.7151C34.4152 31.3809 33.8731 31.3809 33.5389 31.7151C33.2047 32.0494 33.2047 32.5914 33.5389 32.9257L42.2313 41.618C42.6987 42.0854 42.6987 42.8461 42.2313 43.3135C41.7639 43.7809 41.0033 43.7809 40.5358 43.3135L31.7566 34.5344C31.2428 34.0207 30.9601 33.3377 30.9601 32.6114C30.9601 31.8849 31.243 31.202 31.7566 30.6884C32.817 29.6279 34.5422 29.6279 35.6026 30.6884L44.8013 39.887C46.4515 41.5373 46.4515 44.2224 44.8013 45.8727C44.0019 46.672 42.9391 47.1123 41.8086 47.1123C40.678 47.1123 39.6152 46.672 38.8158 45.8727L31.7433 38.8C31.409 38.4658 30.8669 38.4658 30.5328 38.8C30.1985 39.1343 30.1985 39.6763 30.5328 40.0106L37.6053 47.0831C38.7281 48.2059 40.2208 48.8242 41.8086 48.8242C43.3963 48.8242 44.8892 48.2059 46.0118 47.0831C47.1345 45.9603 47.753 44.4675 47.753 42.8796C47.753 41.2919 47.1346 39.799 46.0118 38.6764L36.8132 29.4777Z"
                                fill="white"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_3410_10316">
                                <rect
                                  width="33"
                                  height="33"
                                  fill="white"
                                  transform="translate(22 22)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                          <input
                            class="input-file"
                            type="file"
                            @change="attach('document')"
                            accept=".pdf, .doc, .docx, .xls, .xlsx, .txt"
                          />
                        </div>
                        <div
                          class="font-weight-500 font-18 black--text text-center"
                        >
                          Documents
                        </div>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </div>
          </div>
        </v-col>
      </v-row>

      <!------group chat------------->
      <v-row style="height: 100%" v-if="groupchatBox">
        <!-- Left: Chat Cards -->

        <v-col cols="5" class="pl-12 pb-12 h-100">
          <div class="pt-1" style="height: 96%">
            <v-card height="95%" class="radius-25 pl-6" elevation="3">
              <div style="display: flex">
                <h5
                  class="py-2 black--text cursor-pointer mr-2"
                  @click="
                    () => {
                      this.groupchatBox = false;
                    }
                  "
                >
                  Chats
                </h5>
                <h5
                  class="py-2 black--text cursor-pointer ml-4"
                  @click="
                    () => {
                      this.groupchatBox = true;
                    }
                  "
                >
                  Groups
                </h5>
              </div>

              <div
                class="chatscroll"
                style="height: 90%"
                v-if="Groups.length > 0"
              >
                <!-- Loop through filteredMembers instead of Groups -->
                <div
                  v-for="Group in Groups"
                  :key="Group.id"
                  style="position: relative"
                >
                  <div
                    @click="selectGroupChat(Group)"
                    class="d-flex py-4 chat-card"
                    style="border-bottom: 1px solid #80808059; cursor: pointer"
                  >
                    <v-avatar class="ml-0 pl-0" v-if="Group.userProfile">
                      <v-img
                        :src="`${imageURL}${Group.userProfile}`"
                        class="ml-0 pl-0"
                        style="border: 3px solid var(--primary-color)"
                      ></v-img>
                    </v-avatar>
                    <v-avatar
                      v-else
                      style="border: 3px solid var(--primary-color)"
                    >
                      <v-img
                        src="/images/singleuser.png"
                        max-width="30"
                        contain
                      ></v-img>
                    </v-avatar>
                    <div
                      class="d-flex justify-space-between"
                      style="width: 100%; position: relative"
                    >
                      <div class="ml-3" style="margin-top: 11px">
                        <span class="font-weight-600">{{
                          Group?.name?.length > 30
                            ? `${Group.name.slice(0, 30)}...`
                            : Group.name || Group.email || "\u00A0"
                        }}</span>
                        <!-- <div>{{ Group.email }}</div> -->
                      </div>
                    </div>
                  </div>
                  <v-icon
                    v-if="!search"
                    @click="deleteChatItem(Group)"
                    class="cursor-pointer"
                    style="
                      color: var(--primary-color);
                      position: absolute;
                      right: 4%;
                      top: 34%;
                      z-index: 400;
                    "
                    >mdi-delete</v-icon
                  >
                </div>
              </div>
              <div
                v-if="Groups.length === 0 && loader == false"
                style="height: 90%; color: var(--primary-color)"
                class="d-flex align-center justify-center font-20 font-weight-600"
              >
                Start Your First Chat By Searching Member
              </div>
            </v-card>
          </div>
        </v-col>

        <!-- Right: Chat Window -->
        <v-col cols="7" class="pl-5 pr-12 pb-12 h-100">
          <div class="pt-1" style="height: 100%">
            <div
              v-if="!selectedGroupChat"
              class="d-flex justify-center h-100 align-center"
            >
              <svg
                width="265"
                height="266"
                viewBox="0 0 265 266"
                border="0px"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.4">
                  <path
                    d="M218.225 196.507L223.393 238.379C224.718 249.377 212.925 257.063 203.517 251.365L157.67 224.069C154.489 222.214 153.694 218.238 155.417 215.058C162.042 202.868 165.62 189.087 165.62 175.306C165.62 126.809 124.013 87.3219 72.8654 87.3219C62.3974 87.3219 52.1944 88.9119 42.6539 92.0921C37.7511 93.6822 32.9809 89.177 34.1735 84.1417C46.2316 35.9093 92.6089 0 147.997 0C212.66 0 265 48.8949 265 109.185C265 144.962 246.582 176.631 218.225 196.507Z"
                    fill="var(--primary-color)"
                  />
                  <path
                    d="M145.757 175.382C145.757 191.15 139.927 205.726 130.121 217.254C117.003 233.155 96.1998 243.358 72.8786 243.358L38.2944 263.896C32.4641 267.474 25.0438 262.571 25.8388 255.813L29.1515 229.71C11.3956 217.386 0 197.643 0 175.382C0 152.061 12.4556 131.522 31.5366 119.332C43.3297 111.646 57.5079 107.273 72.8786 107.273C113.161 107.273 145.757 137.75 145.757 175.382Z"
                    fill="var(--primary-color)"
                  />
                </g>
              </svg>
            </div>
            <div v-else class="h-100">
              <v-card
                class="radius-25"
                elevation="3"
                style="
                  position: relative;
                  display: flex;
                  flex-direction: column;
                  height: 90.9%;
                "
              >
                <div
                  style="
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 3000;
                    background-color: #19191a12;
                    padding: 20px;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 20px;
                  "
                  v-if="chatLoader"
                >
                  <v-progress-circular
                    indeterminate
                    color="var(--primary-color)"
                  ></v-progress-circular>
                </div>

                <div
                  class="d-flex justify-space-between py-5"
                  style="
                    width: 100%;
                    background-color: var(--secondary-color);
                    padding: 10px;
                  "
                >
                  <div class="d-flex align-center">
                    <v-avatar
                      class="ml-5 pl-0"
                      v-if="selectedGroupChat.userProfile"
                    >
                      <v-img
                        :src="`${imageURL}${selectedGroupChat.userProfile}`"
                        style="border: 3px solid var(--primary-color)"
                      ></v-img>
                    </v-avatar>
                    <v-avatar
                      class="ml-5"
                      v-else
                      style="border: 3px solid var(--primary-color)"
                    >
                      <v-img
                        src="/images/singleuser.png"
                        max-width="30"
                        contain
                      ></v-img>
                    </v-avatar>
                    <h5 class="ml-5 pl-0">
                      {{
                        selectedGroupChat?.name?.length > 30
                          ? `${selectedGroupChat.name.slice(0, 30)}...`
                          : selectedGroupChat.name || selectedGroupChat.email
                      }}
                    </h5>
                  </div>
                  <!-- <v-btn icon @click="scrollToBottom">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn> -->
                </div>
                <div style="height: 80%">
                  <div
                    class="chatscroll ml-6 mr-3"
                    style="flex-grow: 1; overflow-y: auto"
                    ref="container"
                  >
                    <div
                      v-for="(msg, index) in chatMessages"
                      :key="index"
                      class="d-flex py-2 mr-3 flex-column"
                      :class="{
                        'align-right': msg.isMine,
                        'align-start': !msg.isMine,
                      }"
                    >
                      <v-card
                        :class="['message-card', { 'my-message': msg.isMine }]"
                        :style="{
                          'background-color': msg.isMine
                            ? '#FDF4F4'
                            : '#F7F7F7',
                          width:
                            msg.type === 'image' || msg.type === 'document'
                              ? '40%'
                              : 'auto',
                        }"
                      >
                        <div
                          style="max-height: 200px"
                          v-if="msg.type === 'image'"
                        >
                          <a :href="msg.message" download target="_blank">
                            <v-img
                              :src="msg.message"
                              max-width="100%"
                              max-height="186px"
                              cover
                              class="cursor-pointer"
                            ></v-img>
                          </a>
                        </div>
                        <v-card
                          class="d-flex justify-space-between align-center"
                          v-if="msg.type === 'document'"
                        >
                          <v-card-title class="d-flex align-center">
                            <v-icon
                              class="mr-2"
                              color="var(--primary-color)"
                              style="font-size: 30px"
                              >mdi-file-document</v-icon
                            >
                            <span class="font-14">{{
                              getCleanFileName(msg.message).length > 30
                                ? `${getCleanFileName(msg.message).slice(
                                    0,
                                    30
                                  )}...`
                                : getCleanFileName(msg.message)
                            }}</span>
                          </v-card-title>
                          <v-card-actions>
                            <a
                              text
                              :href="msg.message"
                              download
                              target="_blank"
                            >
                              <v-icon
                                color="var(--primary-color)"
                                style="font-size: 30px"
                                >mdi-download-circle</v-icon
                              >
                            </a>
                          </v-card-actions>
                        </v-card>
                        <div
                          v-if="msg.type !== 'document' && msg.type !== 'image'"
                        >
                          {{ msg.message }}
                        </div>
                      </v-card>
                      <div class="message-time">
                        {{ formatDateAndTime(msg?.createdAt) }}
                      </div>
                    </div>
                  </div>
                </div>
              </v-card>

              <v-dialog v-model="dialog" max-width="400px" persistent>
                <v-card class="pa-4 radius-21">
                  <v-row style="display: flex; justify-content: flex-end">
                    <v-card-title>
                      <v-icon
                        @click="dialog = false"
                        color="var(--primary-color)"
                        style="font-size: 33px"
                        >mdi-close-circle</v-icon
                      >
                    </v-card-title></v-row
                  >
                  <v-card-text>
                    <v-row class="mt-3">
                      <v-col cols="6" class="text-center">
                        <div class="chat-uploadfile">
                          <svg
                            width="87"
                            height="87"
                            viewBox="0 0 77 77"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              cx="38.5"
                              cy="38.5"
                              r="38.5"
                              fill="var(--primary-color)"
                            />
                            <path
                              d="M33.5 54H42.5C50 54 53 51 53 43.5V34.5C53 27 50 24 42.5 24H33.5C26 24 23 27 23 34.5V43.5C23 51 26 54 33.5 54Z"
                              stroke="white"
                              stroke-width="1.7"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M33.5 35.9922C35.1569 35.9922 36.5 34.649 36.5 32.9922C36.5 31.3353 35.1569 29.9922 33.5 29.9922C31.8431 29.9922 30.5 31.3353 30.5 32.9922C30.5 34.649 31.8431 35.9922 33.5 35.9922Z"
                              stroke="white"
                              stroke-width="1.7"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M24.0039 49.4288L31.3989 44.4638C32.5839 43.6688 34.2939 43.7588 35.3589 44.6738L35.8539 45.1088C37.0239 46.1138 38.9139 46.1138 40.0839 45.1088L46.3239 39.7538C47.4939 38.7487 49.3839 38.7487 50.5539 39.7538L52.9989 41.8537"
                              stroke="white"
                              stroke-width="1.7"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          <input
                            class="input-file"
                            type="file"
                            @change="attach('image')"
                            multiple
                            accept="image/png, image/jpeg, image/bmp"
                          />
                        </div>
                        <div
                          class="font-weight-500 font-18 black--text text-center"
                        >
                          Photos
                        </div>
                      </v-col>
                      <v-col cols="6" class="text-center">
                        <div class="chat-uploadfile">
                          <svg
                            width="87"
                            height="87"
                            viewBox="0 0 77 77"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              cx="38.5"
                              cy="38.5"
                              r="38.5"
                              fill="var(--primary-color)"
                            />
                            <g clip-path="url(#clip0_3410_10316)">
                              <path
                                d="M54.7492 31.6648L45.3352 22.2507C45.1747 22.0902 44.957 22 44.7299 22H27.8133C24.6078 22 22 24.6078 22 27.8133V49.1868C22 52.3923 24.6078 55.0001 27.8133 55.0001H49.1868C52.3923 55.0001 55.0001 52.3923 55.0001 49.1868V32.27C55 32.043 54.9097 31.8253 54.7492 31.6648ZM45.4432 24.7799L52.22 31.5566H45.4432V24.7799ZM49.1867 53.288H27.8133C25.5519 53.288 23.712 51.4481 23.712 49.1867V27.8133C23.712 25.5519 25.5519 23.712 27.8133 23.712H43.7312V32.4126C43.7312 32.8853 44.1146 33.2686 44.5872 33.2686H53.2878V49.1867C53.288 51.4481 51.4481 53.288 49.1867 53.288Z"
                                fill="white"
                              />
                              <path
                                d="M36.8132 29.4777C35.9761 28.6406 34.8633 28.1797 33.6796 28.1797C32.4959 28.1797 31.3831 28.6406 30.546 29.4777C29.709 30.3147 29.248 31.4275 29.248 32.6112C29.248 33.795 29.709 34.9078 30.546 35.7448L39.3253 44.524C40.4605 45.6591 42.307 45.6588 43.442 44.524C44.5769 43.389 44.5769 41.5424 43.442 40.4073L34.7495 31.7151C34.4152 31.3809 33.8731 31.3809 33.5389 31.7151C33.2047 32.0494 33.2047 32.5914 33.5389 32.9257L42.2313 41.618C42.6987 42.0854 42.6987 42.8461 42.2313 43.3135C41.7639 43.7809 41.0033 43.7809 40.5358 43.3135L31.7566 34.5344C31.2428 34.0207 30.9601 33.3377 30.9601 32.6114C30.9601 31.8849 31.243 31.202 31.7566 30.6884C32.817 29.6279 34.5422 29.6279 35.6026 30.6884L44.8013 39.887C46.4515 41.5373 46.4515 44.2224 44.8013 45.8727C44.0019 46.672 42.9391 47.1123 41.8086 47.1123C40.678 47.1123 39.6152 46.672 38.8158 45.8727L31.7433 38.8C31.409 38.4658 30.8669 38.4658 30.5328 38.8C30.1985 39.1343 30.1985 39.6763 30.5328 40.0106L37.6053 47.0831C38.7281 48.2059 40.2208 48.8242 41.8086 48.8242C43.3963 48.8242 44.8892 48.2059 46.0118 47.0831C47.1345 45.9603 47.753 44.4675 47.753 42.8796C47.753 41.2919 47.1346 39.799 46.0118 38.6764L36.8132 29.4777Z"
                                fill="white"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_3410_10316">
                                <rect
                                  width="33"
                                  height="33"
                                  fill="white"
                                  transform="translate(22 22)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                          <input
                            class="input-file"
                            type="file"
                            @change="attach('document')"
                            accept=".pdf, .doc, .docx, .xls, .xlsx, .txt"
                          />
                        </div>
                        <div
                          class="font-weight-500 font-18 black--text text-center"
                        >
                          Documents
                        </div>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card>
    <!------------Delete Dialog------------------>
    <v-dialog v-model="deleteDialog" persistent max-width="400">
      <v-card class="pa-6 radius-21">
        <div class="d-flex justify-end">
          <v-icon
            @click="deleteDialog = false"
            color="var(--primary-color)"
            style="font-size: 33px"
            >mdi-close-circle</v-icon
          >
        </div>
        <div class="d-flex justify-center">
          <deletesvgcomponent />
        </div>
        <h3
          style="color: var(--primary-color)"
          class="font-weight-500 text-center"
        >
          Are you sure?
        </h3>
        <h6
          style="color: var(--primary-color)"
          class="text-center font-weight-500"
        >
          Delete this chat
        </h6>
        <v-row class="my-4">
          <v-col cols="12" md="6">
            <v-btn
              class="py-6 w-100 radius-25"
              color="var(--primary-color)"
              @click="close()"
              ><span class="text-transform font-18 white--text">Cancel</span>
            </v-btn>
          </v-col>
          <v-col cols="12" md="6">
            <v-btn
              v-if="deleteItem?.groupName"
              class="py-6 w-100 radius-25"
              color="var(--primary-color)"
              @click="deleteGroup"
              ><span class="text-transform font-18 white--text"
                >Delete Group</span
              >
            </v-btn>
            <v-btn
              v-else
              class="py-6 w-100 radius-25"
              color="var(--primary-color)"
              @click="deleteChat"
              ><span class="text-transform font-18 white--text"
                >Delete Chat
              </span>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
    <!------------Add Dialog------------------>
    <v-dialog v-model="addGroupDialog" persistent max-width="600">
      <v-card class="pa-6 radius-21">
        <AddGroupChat
          :editedGroupInfoData="editedGroupInfoData"
          @fetchList="fetchdata"
          @close="close"
        />
      </v-card>
    </v-dialog>
    <!------------Add Group Member Dialog------------------>
    <v-dialog v-model="addGroupMemberDialog" persistent max-width="600">
      <v-card class="pa-6 radius-21">
        <AddMemberGroupChat
          :selectedChat="selectedChat"
          :groupMembersList="groupMembersList"
          @close="close"
        />
      </v-card>
    </v-dialog>
    <!-----------Group Information -Drawer----------------------->
    <v-navigation-drawer
      v-model="openGroupInfoDrawer"
      right
      width="500"
      absolute
      class="custom-navigation-drawer"
    >
      <!-- Group Info Header -->
      <v-list-item class="py-5">
        <v-avatar v-if="selectedChat?.groupImage">
          <v-img
            :src="`${imageURL}${selectedChat.groupImage}`"
            style="border: 3px solid var(--primary-color)"
          ></v-img>
        </v-avatar>
        <v-avatar v-else>
          <v-icon x-large color="var(--primary-color)"
            >mdi-account-group-outline</v-icon
          >
        </v-avatar>

        <v-list-item-title
          class="text-h6 ml-6 font-weight-bold d-flex justify-space-between"
        >
          {{ selectedChat?.groupName }}
          <div>
            <v-icon
              @click="editGroupInfoDialog(selectedChat, 'Edit')"
              color="var(--primary-color) mr-2"
              >mdi-pencil</v-icon
            >
            <v-icon @click="openGroupInfoDrawer = false">mdi-close</v-icon>
          </div>
        </v-list-item-title>
      </v-list-item>

      <v-divider />
      <div
        class="group-members"
        style="overflow-y: scroll; overflow-x: hidden; height: 70vh"
      >
        <v-list dense>
          <h6 class="ml-6">Members ({{ groupMembersList.length }})</h6>
          <div class="d-flex justify-center">
            <v-progress-circular
              :size="50"
              v-if="!groupMembersList?.length"
              color="primary"
              v-model="GroupMemberListLoading"
              indeterminate
            ></v-progress-circular>
          </div>
          <v-list-item
            v-for="(member, index) in groupMembersList"
            :key="index"
            @click="selectMember(member)"
            class="member-item my-5"
          >
            <v-list-item-avatar>
              <v-img v-if="member.image" :src="`${imageURL}${member.image}`" />
              <v-avatar v-else>
                <v-img src="/images/person.png" />
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title style="font-weight: bold; font-size: 17px">{{
                member.name
              }}</v-list-item-title>
              <v-list-item-subtitle>{{ member.email }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-btn
              v-if="!member.name.includes('(me)')"
              small
              icon
              @click.stop="removeGroupMember(member)"
            >
              <v-icon color="red">mdi-delete</v-icon>
            </v-btn>
            <!-- <v-btn small icon @click.stop="removeGroupMember(member)">
              <v-icon color="red">mdi-delete</v-icon>
            </v-btn> -->
          </v-list-item>
        </v-list>
      </div>

      <v-divider />

      <!-- Footer Actions -->
      <v-list dense class="mt-5">
        <v-list-item>
          <v-btn outlined block text @click="addGroupMemberDialog = true">
            <v-icon color="var(--primary-color)">mdi-account-plus</v-icon>
            <span
              style="
                font-size: 18px;
                margin-top: 1px;
                margin-left: 9px;
                color: var(--primary-color);
              "
              class="text-transform"
            >
              Add Member</span
            ></v-btn
          >
        </v-list-item>
        <!-- <v-list-item>
          <v-btn block text color="red" @click="reportGroup"
            >Delete group</v-btn
          >
        </v-list-item> -->
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import { db, storage, firestore } from "../auth/firebaseConfig";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import {
  query,
  where,
  collection,
  addDoc,
  getDocs,
  orderBy,
  onSnapshot,
  serverTimestamp,
  setDoc,
  getDoc,
  deleteDoc,
  doc,
  updateDoc,
  writeBatch,
  getFirestore,
} from "firebase/firestore";
import deletesvgcomponent from "@/components/Deletesvg/delete.component.vue";
import AddGroupChat from "../../components/Chat/AddGroupChat.component.vue";
import AddMemberGroupChat from "../../components/Chat/AddMemberGroupChat.component.vue";

export default {
  components: { deletesvgcomponent, AddGroupChat, AddMemberGroupChat },
  data() {
    return {
      groupUnreadCounts: null,
      unreadCount: null,
      newGroupMessage: "",
      groupchatBox: false,
      members: [], // Original list of chat members
      GroupChatMembers: [], // Original list of chat members
      search: "", // Stores the search input
      selectedChat: null,
      editedGroupInfoData: null,
      openGroupInfoDrawer: false,
      fileTypeThroughChat: "",
      GroupMemberListLoading: false,
      groupMembersList: [],
      imagesForImages: "",
      GroupMessageId: "",
      addGroupDialog: false,
      viewGroupMemberList: true,
      addGroupMemberDialog: false,
      chatMessages: [],
      newMessage: "",
      singleChatOption: true,
      groupChatOption: false,
      dialog: false,
      imageURL: process.env.VUE_APP_IMG_API,
      loader: false,
      chatLoader: false,
      document: "",
      image: "",
      deleteDialog: false,
      deleteItem: null,
      receiverGroupFCMToken: null,
      receiverFCMToken: {
        token: null,
        id: null,
        name: null,
      },
    };
  },
  computed: {
    ...mapGetters([
      "getOrganizationId",
      "getUsersForGroupChat",
      "getUsersForChat",
      "getUserId",
      "getUserData",
    ]),
    filteredMembers() {
      if (this.search && this.search.trim() !== "") {
        return this.members; // Return all members if search is not empty
      }
      return this.members.filter((member) => member.ischatopen);
      // return this.members.filter((member) => member.ischatopen);
    },
  },
  watch: {
    getOrganizationId: {
      immediate: true,
      handler(newValue, oldValue) {
        if (oldValue && oldValue !== newValue) {
          this.fetchdata();
          this.fetchGroupdata();
        }
      },
    },
  },
  methods: {
    selectChat(member) {
      if (member.groupName) {
        this.selectedChat = member;
        this.getGroupMessages(member);
        this.GroupMessageId = member;

        this.receiverGroupFCMToken = member.groupMembers
          .filter((member) => member.fcmToken !== null)
          .map((member) => member.fcmToken);
      } else {
        this.selectedChat = member;
        this.getMessages(member);
        this.receiverFCMToken.token = member.fcmToken;
        this.receiverFCMToken.id = member.id;
        this.receiverFCMToken.name = member.name;

        this.$store.dispatch("setUserChatStatus", {
          userId: member.id,
          OrganizationId: this.getOrganizationId,
          ChatStatus: true,
        });
        this.members.filter((member) => member.ischatopen);
      }
    },
    editGroupInfoDialog(item, mode) {
      if (mode === "Edit") {
        this.editedGroupInfoData = item; // Populate data for editing
      } else if (mode === "New") {
        this.editedGroupInfoData = {}; // Clear data for creating a new group
      }
      this.addGroupDialog = true;
    },

    async deleteGroupMessages(id) {
      try {
        this.loader = true;
        const deleteQuery = query(
          collection(db, "groups"),
          where("senderId", "in", [+this.getUserId, +id]),
          where("recieverId", "in", [+this.getUserId, +id])
        );

        // Fetch messages based on the query
        const querySnapshot = await getDocs(deleteQuery);

        // Loop through and delete each message document
        const deletePromises = [];
        querySnapshot.forEach((doc) => {
          const deletePromise = deleteDoc(doc.ref); // Delete the document reference
          deletePromises.push(deletePromise); // Store the promise for all deletes
        });

        // Wait for all delete operations to complete
        await Promise.all(deletePromises);
        this.$store.dispatch("deleteGroupMessages", id);
      } catch (error) {
      } finally {
        this.selectedChat = "";
        this.loader = false;
      }
    },
    async deleteMessages(id) {
      try {
        this.loader = true;
        const deleteQuery = query(
          collection(db, "broker-chat"),
          where("senderId", "in", [+this.getUserId, +id]),
          where("recieverId", "in", [+this.getUserId, +id])
        );

        // Fetch messages based on the query
        const querySnapshot = await getDocs(deleteQuery);

        // Loop through and delete each message document
        const deletePromises = [];
        querySnapshot.forEach((doc) => {
          const deletePromise = deleteDoc(doc.ref); // Delete the document reference
          deletePromises.push(deletePromise); // Store the promise for all deletes
        });

        // Wait for all delete operations to complete
        await Promise.all(deletePromises);
      } catch (error) {
      } finally {
        this.selectedChat = "";
        this.loader = false;
      }
    },

    async updateStatus(memberId, status) {
      this.loader = true;

      try {
        // Update chat status in Vuex
        let payload = {
          userId: memberId,
          OrganizationId: this.getOrganizationId,
          ChatStatus: status,
        };
        await this.$store.dispatch("setUserChatStatus", payload);

        // Query Firebase for unread messages
        const q = query(
          collection(db, "broker-chat"),
          where("senderId", "==", memberId), // Messages sent by the other person
          where("recieverId", "==", this.getUserId), // Messages received by me
          where("isRead", "==", false) // Only unread messages
        );

        const querySnapshot = await getDocs(q);

        // Mark all unread messages as read
        querySnapshot.forEach(async (doc) => {
          await updateDoc(doc.ref, { isRead: true });
        });

        // Update local UI to remove red dot
        const member = this.members.find((m) => m.id === memberId);
        if (member) {
          this.$set(member, "hasUnreadMessages", false);
        }

        // Refresh data after updating read status
        this.fetchdata();
      } catch (error) {
        console.error("Error updating message status:", error);
      } finally {
        this.loader = false;
      }
    },
    deleteChatItem(item) {
      this.deleteDialog = true;
      this.deleteItem = item;
    },
    close() {
      this.deleteDialog = false;
      this.addGroupDialog = false;
      this.addGroupMemberDialog = false;
    },
    deleteChat() {
      this.updateStatus(this.deleteItem?.id, false);
      this.deleteMessages(this.deleteItem?.id);
      this.close();
    },
    deleteGroup() {
      this.updateStatus(this.deleteItem?.id, false);
      this.deleteGroupMessages(this.deleteItem?.id);
      this.close();
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.container;
        if (container?.scrollHeight)
          container.scrollTop = container?.scrollHeight;
      });
    },
    getCleanFileName(url) {
      const fileNameWithExtension = this.getFileNameFromUrl(url);

      // Split by '-' and take the first part to get the clean file name
      const cleanFileName =
        fileNameWithExtension.split("-")[0] +
        "." +
        fileNameWithExtension.split(".").pop();

      return cleanFileName;
    },
    getFileNameFromUrl(url) {
      // Split the URL by '/' and get the last part
      const urlParts = url.split("/");
      const lastPart = urlParts[urlParts.length - 1];

      // Split by '?' to remove query parameters if they exist
      const fileNameWithExtension = lastPart.split("?")[0];

      return fileNameWithExtension; // This returns the file name with extension
    },
    formatDateAndTime(isoString) {
      if (!isoString) return "Invalid Date";

      const date = new Date(isoString);

      // Extract day, month, year
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
      const year = date.getFullYear();

      // Extract hours, minutes, and determine AM/PM
      let hours = date.getHours();
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const amPm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12; // Convert 24-hour format to 12-hour

      return `${day}-${month}-${year}, ${hours}:${minutes} ${amPm}`;
    },
    fetchdata() {
      if (this.getOrganizationId) {
        this.loader = true;
        this.payload = {
          ...(this.singleChatOption
            ? { orgId: this.getOrganizationId }
            : { organizationId: this.getOrganizationId }),
          isPagination: false,
          roleId: null,
        };
        if (this.search) {
          this.payload = { search: this.search.trim(), ...this.payload };
        }
        if (this.singleChatOption == true) {
          this.$store
            .dispatch("getUsersForChat", this.payload)
            .then((response) => {
              this.loader = false;
              this.members = this.getUsersForChat?.userList || [];
              const chatIds = this.getUsersForChat?.userList.map(
                (user) => user.id
              );
              this.getMessagesForAll(chatIds);
            });
        } else {
          this.$store
            .dispatch("getUsersForGroupChat", this.payload)
            .then((response) => {
              this.loader = false;
              this.GroupChatMembers = this.getUsersForGroupChat || [];
              this.getAllGroupMessagesCount(this.GroupChatMembers);
            });
        }
      }
    },
    fetchGroupdata() {
      if (this.getOrganizationId) {
        this.loader = true;
        this.payload = {
          organizationId: this.getOrganizationId,
          isPagination: false,
          roleId: null,
        };
        if (this.search) {
          this.payload = { search: this.search.trim(), ...this.payload };
        }
        this.$store
          .dispatch("getUsersForGroupChat", this.payload)
          .then((response) => {
            this.loader = false;
            this.Groups = this.getUsersForGroupChat?.userList || [];
          });
      }
    },

    selectGroupChat(Group) {
      this.selectedGroupChat = Group;
      this.getgroupMessages(Group);
    },
    async storeFirebaseImage(file) {
      const formData = new FormData();
      formData.append("Image", file);
      const authToken = localStorage.getItem("userToken");
      if (!authToken) {
        console.error("Authorization token not found!");
        return;
      }
      this.loader = true;

      const response = await axios.post(
        "http://brokerapis.rootpointers.net/api/GroupChat/ImageUploadInChat",
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Ensure this.authToken contains a valid token
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.succeeded) {
        this.loader = false;
        this.imagesForImages =
          `http://brokerapis.rootpointers.net` + response.data.data;
        if (this.fileTypeThroughChat === "groupfile") {
          this.sendGroupMessage();
        }
        if (this.fileTypeThroughChat === "singlefile") {
          this.sendMessage();
        }
        return response.data.data; // Returning API response
      } else {
        console.error("API Upload Failed:", response.data);
      }
      this.loader = false;
    },

    async sendGroupMessage(member) {
      const filteredMembers = this.GroupMessageId.groupMembers.filter(
        (member) => member.userId !== Number(this.getUserId)
      );

      setTimeout(async () => {
        const isImage = (url) => /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
        const isDocument = (url) =>
          /\.(pdf|doc|docx|xls|xlsx|ppt|pptx)$/i.test(url);

        let imageUrl = null;
        let documentUrl = null;

        if (this.imagesForImages) {
          if (isImage(this.imagesForImages)) {
            imageUrl = this.imagesForImages;
          } else if (isDocument(this.imagesForImages)) {
            documentUrl = this.imagesForImages;
          }
        }

        const senderId = +this.getUserId;
        const chatId = this.GroupMessageId.id.toString();
        const timestamp = new Date().toISOString();

        const messageData = {
          senderId,
          createdById: this.GroupMessageId.createdById,
          text: this.newGroupMessage,
          imageUrl,
          documentUrl,
          status: 0, // 0 means unread
          timestamp,
        };

        // Add message to Firestore
        await addDoc(
          collection(db, "groupChatRooms", chatId, "messages"),
          messageData
        );

        let lastMessageText =
          this.newGroupMessage ||
          (imageUrl ? "Image" : documentUrl ? "Document" : "");

        // Fetch current unread count
        const groupChatDoc = await getDoc(doc(db, "groupChatRooms", chatId));
        let unreadCounts = {};
        if (groupChatDoc.exists()) {
          unreadCounts = groupChatDoc.data().unReadCount || {};
        }

        // Increment unread count for all users except sender

        this.GroupMessageId.groupMembers.forEach((member) => {
          if (member.userId !== senderId) {
            unreadCounts[member.userId.toString()] =
              (unreadCounts[member.userId.toString()] || 0) + 1;
          }
        });

        // Update Firestore with last message and unread count
        await setDoc(
          doc(db, "groupChatRooms", chatId),
          {
            lastMessage: lastMessageText,
            lastMessageTime: timestamp,
            unReadCount: unreadCounts,
          },
          { merge: true }
        );

        this.$store.dispatch("pushNotificationFirebase", {
          title: this.getUserData.userList[0].name,
          body: this.newGroupMessage,
          deviceToken: this.receiverGroupFCMToken,
          data: {
            type: "chat",
            sender_id: this.getUserId,
            sender_name: this.getUserData.userList[0].name,
            sender_image: "",
            sender_fcm_token: "",
            group_fcm_token: "",
            group_created_id: "",
            isGroup: "true",
          },
        });

        this.newGroupMessage = "";
      }, 300);
    },

    async sendDocument(documentURL) {
      if (documentURL) {
        try {
          this.chatLoader = true;
          // Add Data in Firebase DB
          const docRef = await addDoc(collection(db, "broker-chat"), {
            message: documentURL,
            createdAt: new Date(),
            senderId: +this.getUserId,
            recieverId: +this.selectedChat.id,
            type: "document",
          });
        } catch (e) {
        } finally {
          this.chatLoader = false;
        }
      }
    },
    async getAllGroupMessagesCount(groupChatIds) {
      let groupMessagesCount = {};

      for (const group of groupChatIds) {
        const chatId = group.id.toString();
        const groupRef = doc(db, "groupChatRooms", chatId);

        try {
          const docSnap = await getDoc(groupRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            const unreadCounts = data.unReadCount || {}; // Handle missing `unReadCount`

            // ✅ Fetch unread count for specific user
            const userUnreadCount = unreadCounts[this.getUserId] || 0;

            groupMessagesCount[chatId] = userUnreadCount;
          } else {
            console.warn(`Group ${chatId} not found in Firestore`);
            groupMessagesCount[chatId] = 0;
          }
        } catch (error) {
          console.error(`Error fetching messages for group ${chatId}:`, error);
          groupMessagesCount[chatId] = "Error";
        }
      }

      // ✅ Convert keys to integers
      this.groupUnreadCounts = Object.fromEntries(
        Object.entries(groupMessagesCount).map(([key, value]) => [
          parseInt(key),
          value,
        ])
      );

      return this.groupUnreadCounts;
    },
    async markAllAsGroupMessageRead(groupChatId) {
      const chatId = groupChatId.toString(); // Ensure it's a string
      const groupRef = doc(db, "groupChatRooms", chatId);

      try {
        const docSnap = await getDoc(groupRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const unreadCounts = { ...data.unReadCount }; // Clone object

          if (unreadCounts[this.getUserId] !== undefined) {
            unreadCounts[this.getUserId] = 0; // ✅ Reset unread count for this user

            await updateDoc(groupRef, { unReadCount: unreadCounts });

            // ✅ Double-check update in Firestore
            const updatedSnap = await getDoc(groupRef);
            console.log("After Update:", updatedSnap.data().unReadCount);
          } else {
            console.warn(`User ID ${this.getUserId} not found in unreadCounts`);
          }
        } else {
          console.warn(`Group ${chatId} not found in Firestore`);
        }
      } catch (error) {
        console.error(`Error updating messages for group ${chatId}:`, error);
      }

      // ✅ Update locally for instant UI change
      if (this.groupUnreadCounts) {
        this.$set(this.groupUnreadCounts, groupChatId, 0); // Vue reactivity fix
      }
    },
    async getGroupMessages(member) {
      try {
        const senderId = +this.getUserId;
        const receiverId = +this.selectedChat.id;

        const chatId = member.id.toString();

        // Firebase Query to Get Specific Messages
        const q = query(
          collection(db, "groupChatRooms", chatId, "messages"),
          orderBy("timestamp", "asc")
        );

        // Real-time Listener for Messages
        this.unsubscribeMessages = onSnapshot(q, (querySnapshot) => {
          const messages = [];
          querySnapshot.forEach((doc) => {
            messages.push({
              id: doc.id,
              isMine: doc.data().senderId === senderId, // Check if the message is sent by the user
              ...doc.data(),
            });
          });

          this.chatMessages = messages;

          // Scroll to the bottom after new messages load
          this.scrollToBottom();
        });
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    },

    openDialog(e) {
      this.fileTypeThroughChat = e;
      this.dialog = true;
    },
    attach(type) {
      const file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = () => {};
      fileReader.readAsDataURL(file);
      // Reset input so same file can be selected again
      event.target.value = null;
      if (type === "image") {
        this.image = file;
        this.storeFirebaseImage(this.image);
        this.dialog = false;
      } else {
        this.document = file;
        this.storeFirebaseImage(this.document);
        this.dialog = false;
      }
    },
    getGroupMemberById() {
      this.$store
        .dispatch("getGroupMemberById", this.selectedChat.id)
        .then((response) => {
          if (response.data.succeeded) {
            // Retrieve current user ID from local storage
            const currentUserId = parseInt(localStorage.getItem("userId"));

            // Update the group members list
            this.groupMembersList = response.data.data.members.map((member) => {
              if (member.id === currentUserId) {
                return { ...member, name: `${member.name} (me)` };
              }
              return member;
            });
          }
        });
      // this.$store
      //   .dispatch("getGroupMemberById", this.selectedChat.id)
      //   .then((response) => {
      //     if (response.data.succeeded) {
      //       this.groupMembersList = response.data.data;
      //     }

      //   });
    },
    removeGroupMember(payload) {
      let data = {
        GroupId: this.selectedChat.id,
        UserId: payload.id,
      };
      this.$store.dispatch("removeGroupMember", data).then((response) => {
        if (response.data.succeeded) {
          this.$swal.fire({
            position: "top-end",
            icon: "success",
            title: response.data.message,
            showConfirmButton: false,
            timer: 2000,
            toast: true,
          });
          this.getGroupMemberById();
        }
      });
    },
    createChatId(userId, matchedUserId) {
      const firstId = Math.min(userId, matchedUserId);
      const secondId = Math.max(userId, matchedUserId);
      return `${firstId}_${secondId}`;
    },
    async sendMessage(options = {}) {
      const isImage = (url) => /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
      const isDocument = (url) =>
        /\.(pdf|doc|docx|xls|xlsx|ppt|pptx)$/i.test(url);

      let imageUrl = null;
      let documentUrl = null;

      if (this.imagesForImages) {
        if (isImage(this.imagesForImages)) {
          imageUrl = this.imagesForImages;
        } else if (isDocument(this.imagesForImages)) {
          documentUrl = this.imagesForImages;
        }
      }

      const { fcmToken = "" } = options;
      const senderId = +this.getUserId;
      const receiverId = +this.selectedChat.id;
      const chatId = this.createChatId(senderId, receiverId);
      const timestamp = new Date().toISOString();

      const messageData = {
        senderId,
        receiverId,
        text: this.newMessage,
        imageUrl,
        documentUrl,
        status: 0, // 0 means unread
        timestamp,
      };

      try {
        // Add message
        const messagesRef = collection(
          db,
          "chatrooms",
          this.getOrganizationId,
          "chat",
          chatId,
          "messages"
        );
        await addDoc(messagesRef, messageData);

        // Prepare last message text
        let lastMessageText = this.newMessage
          ? this.newMessage
          : imageUrl
          ? "Image"
          : documentUrl
          ? "Document"
          : "";

        // ✅ Corrected chatroom document path
        const chatroomRef = doc(
          db,
          "chatrooms",
          this.getOrganizationId,
          "chat",
          chatId
        );

        // Update chatroom info
        await setDoc(
          chatroomRef,
          {
            lastMessage: lastMessageText,
            lastMessageTime: timestamp,
            participants: [senderId.toString(), receiverId.toString()],
          },
          { merge: true }
        );
        this.$store.dispatch("pushNotificationFirebase", {
          title: this.getUserData.userList[0].name,
          body: this.newMessage,
          deviceToken: [this.receiverFCMToken.token],
          data: {
            type: "chat",
            sender_id: this.getUserId,
            sender_name: this.getUserData.userList[0].name,
            sender_image: "",
            sender_fcm_token: "",
            group_fcm_token: "",
            group_created_id: "",
            isGroup: "false",
          },
        });
        this.newMessage = "";
        this.imagesForImages = "";
      } catch (error) {
        console.error("Error sending message:", error);
      }
    },
    async getMessagesForAll(chatIds) {
      try {
        const senderId = +this.getUserId;

        for (const receiverId of chatIds) {
          await this.getMessages(receiverId);
        }
      } catch (error) {
        console.error("Error fetching messages for multiple receivers:", error);
      }
    },

    async getMessages(member) {
      try {
        const senderId = +this.getUserId;
        const receiverId =
          typeof member === "number" ? member : +this.selectedChat.id;

        const chatId = this.createChatId(senderId, receiverId);

        // Firebase Query to Get Specific Messages
        const q = query(
          collection(
            db,
            "chatrooms",
            this.getOrganizationId,
            "chat",
            chatId,
            "messages"
          ),
          orderBy("timestamp", "asc")
        );

        // Real-time Listener for Messages
        this.unsubscribeMessages = onSnapshot(q, (querySnapshot) => {
          const messages = [];
          let totalStatusCount = 0; // Status ka total sum

          querySnapshot.forEach((doc) => {
            const data = doc.data();
            messages.push({
              id: doc.id,
              isMine: data.senderId === senderId, // Check if the message is sent by the user
              ...data,
            });

            // Status ka total count add karein (agar status exist kare)
            if (data.status) {
              totalStatusCount += data.status;
            }
          });

          this.chatMessages = messages;
          this.totalStatusCount = totalStatusCount;

          // Scroll to the bottom after new messages load
          this.scrollToBottom();
        });
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    },
    getUnreadCount(receiverId) {
      // Sirf status === 0 wale (unread) messages filter karo
      const filteredMessages = this.chatMessages.filter(
        (msg) => msg.senderId === receiverId && msg.status === 0
      );

      // Total unread messages ka count
      const totalCount = filteredMessages.length;

      return totalCount;
    },
    async markMessagesAsRead(senderId) {
      // Firebase query to get unread messages (status === 0)
      const q = query(
        collection(
          db,
          "chatrooms",
          this.getOrganizationId,
          "chat",
          this.createChatId(this.getUserId, senderId),
          "messages"
        ),
        where("senderId", "==", senderId),
        where("status", "==", 0)
      );

      const querySnapshot = await getDocs(q);

      // Update each message's status to 1 (mark as read)
      const batch = writeBatch(db);

      querySnapshot.forEach((doc) => {
        const docRef = doc.ref;
        batch.update(docRef, { status: 1 });
      });

      await batch.commit();
    },
  },
  mounted() {
    this.fetchdata();
    this.fetchGroupdata();
  },
};
</script>

<style scoped>
.chat-header {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #e1f5fe;
  border-radius: 10px 10px 0 0;
}

.message-card {
  padding: 10px;
  margin: 2px 0;
  border-radius: 8px;
  max-width: 100%;
}

.my-message {
  background-color: #fdf4f4;
  /* Background color for sent messages */
  align-self: flex-end;
  /* Align sent messages to the right */
}

.message-time {
  font-size: 12px;
  color: gray;
  text-align: right;
}

.align-right {
  justify-content: flex-end;
  /* Align sent messages to the right */
}

.chat-input-area {
  margin-top: 10px;
  padding: 25px;
  height: 120%;
  max-height: 660px;
}

.v-btn {
  min-width: 40px;
}

.v-text-field .v-input__prepend-inner {
  display: flex;
  align-items: center;
  justify-content: center;
}

.v-text-field .v-input__append {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100px !important;
}
</style>
