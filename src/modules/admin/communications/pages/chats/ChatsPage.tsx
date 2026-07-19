import ChatsContent from "../../components/chats/ChatsContent"
import { useChats } from "../../hooks/chats/useChats"

export default function ChatsPage() {
  const chats = useChats()

  return <ChatsContent {...chats} />
}
