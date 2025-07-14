import { JSONContent } from "@tiptap/core";
import { ENTITY_SECTION_NODE } from "./nodes";

export const INITIAL_CONTENT: JSONContent = {
  type: "doc",
  content: [
    {
      type: ENTITY_SECTION_NODE,
      attrs: { title: "Description" },
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "A comprehensive digital ecosystem where active individuals can record, analyze, and share their athletic endeavors while connecting with a global community of like-minded people. The platform enhances the experience of sport by providing detailed performance metrics, comparative analysis, and route discovery tools that help users improve and find inspiration. Beyond just tracking, it creates an authentic social network built entirely around physical activities, fostering motivation through shared experiences and achievements.",
            },
          ],
        },
      ],
    },

    {
      type: ENTITY_SECTION_NODE,
      attrs: { title: "Differentiated Value" },
      content: [
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Unlike generic social networks, this platform focuses exclusively on athletic activities, fostering a supportive and motivational environment.",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Offers advanced performance analytics, including Relative Effort, providing deeper insights than basic fitness trackers.",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Curates community-vetted routes and challenges, ensuring users discover safe and engaging training options.",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },

    {
      type: ENTITY_SECTION_NODE,
      attrs: { title: "Capabilities" },
      content: [
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Transform workout data into comprehensive performance insights with detailed metrics, comparative analysis against past efforts, and exclusive measurements like Relative Effort that provide context to athletic progress.",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Discover new routes, challenges, and training opportunities through community-sourced content that expands athletic horizons beyond familiar territories.",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Connect with a purpose-driven athletic community that provides genuine motivation through shared activities rather than manufactured social content.",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Enhance safety during solo activities with real-time location sharing to designated contacts, balancing adventure with peace of mind.",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
