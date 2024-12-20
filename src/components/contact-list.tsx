import { useCallback } from "react";
import { IDirectMessageContacts, useChatStore } from "../store/chat-slice";
import { Avatar, AvatarImage } from "./ui/avatar";
import { HOST } from "../utlis/constant";
import { getColor } from "../lib/utils";

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contacts: IDirectMessageContacts[] | any[];
  isChannel?: boolean;
}

const ContactList = ({ contacts, isChannel = false }: IProps) => {
  const {
    selectedChatData,
    setSelectedChatData,
    setSelectedChatType,
    // selectedChatType,
    setSelectedChatMessages,
  } = useChatStore();

  const handleClick = useCallback(
    ({
      contact,
      isChannel,
    }: {
      contact: IDirectMessageContacts;
      isChannel: boolean;
    }) => {
      if (isChannel) setSelectedChatType("channel");
      else setSelectedChatType("contact");
      setSelectedChatData(contact);
      if (selectedChatData && selectedChatData._id !== contact._id) {
        setSelectedChatMessages([]);
      }
    },
    [
      selectedChatData,
      setSelectedChatData,
      setSelectedChatMessages,
      setSelectedChatType,
    ]
  );

  return (
    <div className="mt-5">
      {contacts.map((contact) => (
        <div
          key={contact._id}
          className={`pl-10 py-2 transition-all duration-300 cursor-pointer ${
            selectedChatData && selectedChatData._id === contact._id
              ? "bg-[#8417ff] hover:bg-[#8417ff]"
              : "hover:bg-[#f1f1f111] "
          }`}
          onClick={() => handleClick({ contact, isChannel: isChannel })}
        >
          <div className="flex gap-5 items-center justify-start text-neutral-300">
            {
              <Avatar className="relative h-10 w-10 rounded-full overflow-hidden">
                {contact?.image ? (
                  <AvatarImage
                    src={`${HOST}/${contact?.image}`}
                    alt="profile"
                    className="object-cover h-full bg-black rounded-full"
                  />
                ) : (
                  <div
                    className={`uppercase h-10 w-10 text-lg  flex justify-center items-center border-[1px] rounded-full ${
                      isChannel
                        ? "bg-[#ffffff22]"
                        : getColor(contact?.color || 0)
                    } `}
                  >
                    {isChannel ? (
                      <>#</>
                    ) : (
                      <>
                        {contact?.firstName
                          ? contact?.firstName.split("").shift()
                          : contact?.email?.split("").shift()}
                      </>
                    )}
                  </div>
                )}
              </Avatar>
            }
            {isChannel ? (
              <div>{contact?.name}</div>
            ) : (
              <div>
                {contact?.firstName || contact?.lastName
                  ? `${contact?.firstName} ${contact?.lastName}`
                  : contact?.email}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
