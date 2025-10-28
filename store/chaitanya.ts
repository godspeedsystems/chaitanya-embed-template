import { emptyApi as api } from './emptyApi';
export const addTagTypes = ['Agents', 'Embed'] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getEmbedCurrentAgent: build.query<
        GetEmbedCurrentAgentApiResponse,
        GetEmbedCurrentAgentApiArg
      >({
        query: (queryArg) => ({
          url: `/embed/agent`,
          headers: {
            'x-user-id': queryArg['x-user-id'],
          },
        }),
        providesTags: ['Embed', 'Agents'],
      }),
      getEmbedAgentById: build.query<GetEmbedAgentByIdApiResponse, GetEmbedAgentByIdApiArg>({
        query: (queryArg) => ({
          url: `/embed/agent/${encodeURIComponent(String(queryArg.id))}`,
          headers: {
            'x-user-id': queryArg['x-user-id'],
          },
        }),
        providesTags: ['Embed', 'Agents'],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as chaitanyaApi };
export type GetEmbedCurrentAgentApiResponse = /** status 200 Agent retrieved successfully */ Agent;
export type GetEmbedCurrentAgentApiArg = {
  /** User ID */
  'x-user-id': string;
};
export type GetEmbedAgentByIdApiResponse = /** status 200 Agent retrieved successfully */ Agent;
export type GetEmbedAgentByIdApiArg = {
  /** Unique identifier of the agent to retrieve */
  id: string;
  /** User ID */
  'x-user-id': string;
};
export type Name = string;
export type AgentType = 'CHATBOT' | 'AUTOMATION' | 'DATA_ANALYSIS' | 'OTHER';
export type Visibility = 'PRIVATE' | 'PUBLIC';
export type Tags = string[];
export type Upload = {
  /** Unique identifier for the upload */
  id: string;
  /** Size of the uploaded file in bytes */
  size: number;
  /** Reference ID of the user who uploaded the file */
  userId: string;
  /** Name of the uploaded file */
  name: string;
  /** MIME type of the uploaded file (e.g., image/png, application/pdf) */
  mimetype: string;
  /** Unique public key for the uploaded file */
  publicKey: string;
  /** Publicly accessible URL of the file */
  publicUrl: string;
};
export type OwnerType = 'USER' | 'ORGANIZATION';
export type Agent = {
  /** Unique identifier for the agent */
  id: string;
  name?: Name;
  type?: AgentType;
  tags?: Tags;
  visibility?: Visibility;
  logo?: Upload | null;
  /** ID of the user or organization that owns the agent */
  ownerId: string;
  ownerType: OwnerType;
  /** Timestamp when the agent was created */
  createdAt: string;
  /** Timestamp when the agent was last updated */
  updatedAt: string;
};
