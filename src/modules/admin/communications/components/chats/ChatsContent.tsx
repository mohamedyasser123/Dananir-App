import ChatsSkeleton from "./ChatsSkeleton"
import ChatsError from "./ChatsError"
import ChatsEmpty from "./ChatsEmpty"
import { isChatsEmpty } from "../../utils/communication.utils"
import type { UseChatsResult } from "../../hooks/chats/useChats"
import ChatDashboard from "./ChatDashboard"

export default function ChatsContent({ data, isLoading, isError, error, refetch }: UseChatsResult) {
  if (isLoading) return <ChatsSkeleton />
  if (isError) return <ChatsError message={error?.message} onRetry={refetch} />
  if (!data || isChatsEmpty(data)) return <ChatsEmpty />

  return (
    <>
      <ChatDashboard chats={data} />
    </>
  )
}
