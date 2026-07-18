import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import TableActionsHeader from "@/components/shared/TableActionsHeader"
import { SharedFormDialog } from "@/components/shared/dialog/SharedFormDialog"
import BankStatsCards from "./bankscomponent/BankStatsCards"
import PricingSection from "./membershipscomponent/PricingSection"
import RecentSubscriptions from "./membershipscomponent/RecentSubscriptions"
import MembershipListSkeleton from "./membershipscomponent/MembershipListSkeleton"
import MembershipListError from "./membershipscomponent/MembershipListError"
import MembershipListEmpty from "./membershipscomponent/MembershipListEmpty"
import { useCreateMembershipPlan } from "../hooks/membership/useCreateMembershipPlan"
import { useUpdateMembershipPlan } from "../hooks/membership/useUpdateMembershipPlan"
import { filterMembershipPlans, isMembershipPlansEmpty, isSubscriptionsEmpty } from "../utils/membership.utils"
import { MEMBERSHIP_PLAN_FORM_FIELDS } from "../constants/membership.form"
import { createMembershipPlanSchema, type CreateMembershipPlanFormValues } from "../schemas/membership.schema"
import type { MembershipPlan } from "../types/membership.types"
import type { UseMembershipPlansResult } from "../hooks/membership/useMembershipPlans"
import type { UseRecentSubscriptionsResult } from "../hooks/membership/useRecentSubscriptions"

type MembershipPlanDialogState =
  | { mode: "create" }
  | { mode: "edit"; plan: MembershipPlan }

const MEMBERSHIP_PLAN_DIALOG_DEFAULT_VALUES: CreateMembershipPlanFormValues = {
  name: "",
  price: "",
}

interface MembershipContentProps {
  plans: UseMembershipPlansResult
  subscriptions: UseRecentSubscriptionsResult
}

export default function MembershipContent({ plans, subscriptions }: MembershipContentProps) {
  const [search, setSearch] = useState("")
  const [dialogState, setDialogState] = useState<MembershipPlanDialogState | null>(null)
  const createPlan = useCreateMembershipPlan()
  const updatePlan = useUpdateMembershipPlan()

  const handleAddPlan = () => {
    setDialogState({ mode: "create" })
  }

  const handleManagePlan = (plan: MembershipPlan) => {
    setDialogState({ mode: "edit", plan })
  }

  const handleDialogSubmit = (values: CreateMembershipPlanFormValues) => {
    if (dialogState?.mode === "edit") {
      updatePlan.mutate({ id: dialogState.plan.id, ...values })
    } else {
      createPlan.mutate(values)
    }
    setDialogState(null)
  }

  const dialogDefaultValues: CreateMembershipPlanFormValues =
    dialogState?.mode === "edit"
      ? { ...dialogState.plan, features: dialogState.plan.features.join(", ") }
      : MEMBERSHIP_PLAN_DIALOG_DEFAULT_VALUES

  const renderPlans = () => {
    if (plans.isLoading) return <MembershipListSkeleton />
    if (plans.isError) return <MembershipListError message={plans.error?.message} onRetry={plans.refetch} />
    if (!plans.data || isMembershipPlansEmpty(plans.data)) return <MembershipListEmpty />

    const filteredPlans = filterMembershipPlans(plans.data, search)
    return <PricingSection plans={filteredPlans} onManagePlan={handleManagePlan} />
  }

  const renderSubscriptions = () => {
    if (subscriptions.isLoading || subscriptions.isError || !subscriptions.data) return null
    if (isSubscriptionsEmpty(subscriptions.data)) return null

    return <RecentSubscriptions subscriptions={subscriptions.data} />
  }

  return (
    <>
      <TableActionsHeader
        searchTerm={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search admins..."
        actionButtonText="Membership"
        onActionClick={handleAddPlan}
        onFilterClick={() => console.log("Filter Admins clicked")}
      />
      <BankStatsCards />
      {renderPlans()}
      {renderSubscriptions()}

      <SharedFormDialog<CreateMembershipPlanFormValues>
        open={dialogState !== null}
        onOpenChange={(open) => !open && setDialogState(null)}
        title={dialogState?.mode === "edit" ? "Edit Membership Plan" : "Add New Membership Plan"}
        fields={MEMBERSHIP_PLAN_FORM_FIELDS}
        defaultValues={dialogDefaultValues}
        resolver={zodResolver(createMembershipPlanSchema)}
        onSubmit={handleDialogSubmit}
        loading={createPlan.isPending || updatePlan.isPending}
        submitText={dialogState?.mode === "edit" ? "Save Changes" : "Save"}
      />
    </>
  )
}
