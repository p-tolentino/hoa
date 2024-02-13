"use client";

import * as z from "zod";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { VehicleSchema } from "@/server/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Vehicle } from "@prisma/client";
import { ExtendedUser } from "@/next-auth";
import { addVehicle } from "@/server/actions/user-info";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { LuCar as Car } from "react-icons/lu";

interface AddVehicleProps {
  initialData: ExtendedUser;
  vehicles: Vehicle[];
}

const AddVehicle: React.FC<AddVehicleProps> = ({ initialData, vehicles }) => {
  const router = useRouter();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof VehicleSchema>>({
    resolver: zodResolver(VehicleSchema),
    defaultValues: {
      plateNum: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof VehicleSchema>) => {
    startTransition(() => {
      addVehicle(values)
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          }

          if (data.success) {
            update();
            form.reset();
            router.refresh();
            console.log(data.success);
          }
        })
        .catch(() => {
          console.log("Something went wrong.");
        });
    });
  };

  return (
    <div className="flex">
      <div className="items-center ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="align-end">
            <FormField
              control={form.control}
              name="plateNum"
              render={({ field }) => (
                <div className="">
                  <div className="flex">
                    <FormItem>
                      <FormLabel className="text-xl font-semibold">
                        Vehicles To Add
                      </FormLabel>
                      <FormDescription>Plate Number</FormDescription>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          placeholder="ZZZ-999"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                    <Button
                      disabled={isPending}
                      className="mt-16 text-black bg-yellow-400 hover:bg-yellow-500 focus:bg-yellow-600"
                      type="submit"
                    >
                      + Add
                    </Button>
                  </div>
                  <ScrollArea className="h-40 border rounded-md">
                    <div className="p-4">
                      {vehicles.map((vehicle) => (
                        <>
                          <div key={vehicle.id} className="flex">
                            <Car className="w-5 h-5 pt-1 mr-2" />
                            {vehicle.plateNum}
                          </div>
                          <Separator className="my-2" />
                        </>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddVehicle;
