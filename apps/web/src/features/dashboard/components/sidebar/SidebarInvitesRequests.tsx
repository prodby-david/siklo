"use client";

import { useState } from "react";
import { Mail, Check, X, Clock, UserPlus } from "lucide-react";

interface InviteItem {
  id: string;
  groupName: string;
  organizerName: string;
  type: "INVITE";
}

interface RequestItem {
  id: string;
  groupName: string;
  status: "PENDING";
  type: "REQUEST";
}

export default function SidebarInvitesRequests() {
  const [invites, setInvites] = useState<InviteItem[]>([
    {
      id: "inv-1",
      groupName: "Techies Savings Circle",
      organizerName: "Alex Rivera",
      type: "INVITE",
    },
  ]);

  const [requests, setRequests] = useState<RequestItem[]>([
    {
      id: "req-1",
      groupName: "Weekend Paluwagan",
      status: "PENDING",
      type: "REQUEST",
    },
  ]);

  const handleAccept = (id: string) => {
    setInvites((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDecline = (id: string) => {
    setInvites((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCancelRequest = (id: string) => {
    setRequests((prev) => prev.filter((item) => item.id !== id));
  };

  const totalCount = invites.length + requests.length;

  return (
    <div className="my-4 pt-4 border-t border-neutral-border/60 flex flex-col gap-3">
      <div className="flex items-center justify-between px-2">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-subtext flex items-center gap-1.5">
          <Mail className="w-3.5 h-3.5 text-brand-accent" /> Invites & Requests
        </span>
        {totalCount > 0 && (
          <span className="rounded-full bg-brand-accent text-white px-2 py-0.5 text-[9px] font-extrabold leading-none">
            {totalCount}
          </span>
        )}
      </div>

      {totalCount === 0 ? (
        <div className="p-3 bg-neutral-table-stripe/50 border border-neutral-border/40 rounded-2xl text-center space-y-1">
          <UserPlus className="w-4 h-4 text-neutral-subtext mx-auto opacity-50" />
          <p className="text-[11px] font-medium text-neutral-subtext">
            No pending invites or requests
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
          {invites.map((item) => (
            <div
              key={item.id}
              className="p-3 bg-background border border-neutral-border/80 rounded-2xl shadow-xs space-y-2 hover:border-brand-accent/30 transition-all"
            >
              <div>
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-brand-accent bg-brand-accent/10 px-2 py-0.5 rounded-full inline-block mb-1">
                  Invite Received
                </span>
                <p className="text-xs font-bold text-foreground line-clamp-1">
                  {item.groupName}
                </p>
                <p className="text-[10px] text-neutral-subtext">
                  From {item.organizerName}
                </p>
              </div>

              <div className="flex items-center gap-1.5 pt-1">
                <button
                  onClick={() => handleAccept(item.id)}
                  className="flex-1 flex items-center justify-center gap-1 bg-brand-accent hover:bg-brand-accent-hover text-white text-[10px] font-bold py-1.5 px-2 rounded-xl transition-all active:scale-95 cursor-pointer shadow-xs"
                >
                  <Check className="w-3 h-3" /> Accept
                </button>
                <button
                  onClick={() => handleDecline(item.id)}
                  className="flex items-center justify-center bg-neutral-subtext/10 hover:bg-neutral-subtext/20 text-neutral-subtext hover:text-foreground p-1.5 rounded-xl transition-all active:scale-95 cursor-pointer"
                  title="Decline"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}

          {requests.map((item) => (
            <div
              key={item.id}
              className="p-3 bg-neutral-table-stripe/60 border border-neutral-border/60 rounded-2xl space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5" /> Pending
                </span>
                <button
                  onClick={() => handleCancelRequest(item.id)}
                  className="text-[10px] text-neutral-subtext hover:text-danger cursor-pointer"
                  title="Cancel Request"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
              <p className="text-xs font-bold text-foreground line-clamp-1">
                {item.groupName}
              </p>
              <p className="text-[10px] text-neutral-subtext">
                Waiting for organizer approval
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
