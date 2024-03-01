import { Heading } from "@/components/ui/heading";
import UploadCard from "./_components/upload-card";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@/lib/auth";
import { getPropertyById } from "@/server/data/user-info";

const requiredDocs = [
  {
    title: "Intent to Purchase or Letter of Intent",
    description: "Desc 1",
  },
  {
    title: "Reservation Letter",
    description: "Desc 2",
  },
  {
    title: "Contract to Sell",
    description: "Desc 3",
  },
  {
    title: "Letter of Guarantee",
    description: "Desc 4",
  },
  {
    title: "Deed of Absolute Sale",
    description: "Desc 5",
  },
  {
    title: "Certification of Title",
    description: "Desc 6",
  },
  {
    title: "Tax Declaration",
    description: "Desc 7",
  },
];

const Membership = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const property = await getPropertyById(user?.id);

  if (!property) {
    return null;
  }

  return (
    <>
      <Heading
        title={`Property Documents`}
        description="Upload image files of required documents"
      />
      <Separator className="mt-2 mb-6" />

      <div className="grid grid-cols-3 gap-4">
        {requiredDocs.map((doc) => {
          const document = property.documents.find((item) => {
            return item.fileName === doc.title;
          });

          return (
            <UploadCard
              key={doc.title}
              title={doc.title}
              description={doc.description}
              property={property}
              document={document || null}
            />
          );
        })}
      </div>
    </>
  );
};

export default Membership;
