import { Clock } from "lucide-react";
import { REMINDER_STYLES, SYSTEM_ALERT_STYLES } from "../constants/dashboard.constants";
import type { PaymentReminder, SystemAlert } from "../types/dashboard.types";

interface SystemAlertsSectionProps {
    paymentReminders: PaymentReminder[];
    systemAlerts: SystemAlert[];
}

export default function SystemAlertsSection({ paymentReminders, systemAlerts }: SystemAlertsSectionProps) {
    return (
        <div className="w-full px-6 py-4">
            <div className="mb-6">
                <h2 className="text-[22px] font-bold text-[#101828]">System Alerts</h2>
                <p className="text-[14px] text-[#99A1AF] font-medium mt-0.5">Critical notifications</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">

                <div className="lg:col-span-4 bg-white rounded-[15px] border border-[#EAEAEA] p-6 flex flex-col justify-between min-h-[480px]">
                    <h3 className="text-[18px] font-bold text-[#101828] mb-6">Payment Reminders</h3>

                    <div className="flex-1 flex flex-col justify-between gap-4">
                        {paymentReminders.map((reminder) => {
                            const styles = REMINDER_STYLES[reminder.urgency]
                            return (
                                <div
                                    key={reminder.id}
                                    className={`flex items-center justify-between p-4 rounded-[12px] border-l-[4px] ${styles.cardBg} ${styles.borderColor} transition-all duration-200`}
                                >
                                    <div className="flex flex-col gap-1.5">
                                        <span className="text-[#101828] font-bold text-[15px]">{reminder.customerName}</span>
                                        <div className="flex items-center gap-1.5">
                                            <Clock className={`w-4 h-4 text-[#4A5565]`} />
                                            <span className={`text-[13px] text-[#4A5565] font-semibold `}>
                                                {reminder.timeText}
                                            </span>
                                        </div>
                                    </div>

                                    <span className="text-[#101828] font-semibold text-[16px] shrink-0">
                                        {reminder.amount}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="lg:col-span-8 flex flex-col gap-5 justify-between min-h-[480px]">
                    {systemAlerts.map((alert) => {
                        const styles = SYSTEM_ALERT_STYLES[alert.type];
                        const IconComponent = styles.icon;
                        return (
                            <div
                                key={alert.id}
                                className="flex-1 flex items-start gap-4 p-5 rounded-[10px] border-l-[4px] transition-all duration-200"
                                style={{
                                    backgroundColor: styles.bg,
                                    borderColor: styles.borderLeft
                                }}
                            >
                                <div
                                    className="p-3 rounded-[12px] border border-[#EAEAEA]/40 shrink-0 flex items-center justify-center bg-white"
                                >
                                    <IconComponent
                                        className="w-6 h-6"
                                        style={{ color: styles.iconColor }}
                                    />
                                </div>

                                <div className="flex-1 flex flex-col justify-between h-full py-0.5">
                                    <div className="space-y-1">
                                        <h4 className="text-[#101828] font-bold text-[16px]">
                                            {alert.title}
                                        </h4>
                                        <p className="text-[#667085] text-[14px] font-medium leading-relaxed">
                                            {alert.description}
                                        </p>
                                    </div>

                                    <span className="text-[#99A1AF] text-[13px] font-medium mt-3 block">
                                        {alert.time}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}
