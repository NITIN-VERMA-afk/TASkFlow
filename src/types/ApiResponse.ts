import { Message } from "@/models/userModels";
export interface ApiResponse {
  success: boolean;
  message: string;
  isAcceptingMessages?: boolean;
  messages?: Array<Message>;
}