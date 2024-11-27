"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "./utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

export const handleFormSubmit = async (
  state: any,
  formData: FormData,
) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const { title, description, category } = Object.fromEntries(formData);
  const imageFile = formData.get("image") as File;
  const pitch = formData.get("pitch") as string;

  if (!imageFile) {
    return parseServerActionResponse({
      error: "Image is required",
      status: "ERROR",
    });
  }

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    // Upload image to Sanity
    const imageAsset = await writeClient.assets.upload('image', imageFile);

    const startup = {
      title,
      description,
      category,
      image: imageAsset.url,
      slug: {
        _type: "slug",
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      pitch,
    };

    const result = await writeClient.create({ _type: "startup", ...startup });

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

export async function createPitch(prevState: any, formData: FormData, pitch: string) {
  try {
    // Here you would typically:
    // 1. Process the form data
    // 2. Save to your database
    // 3. Return result
    
    return {
      status: "SUCCESS",
      _id: "some-generated-id" // Replace with actual ID from your database
    };
  } catch (error) {
    return {
      status: "ERROR",
      error: "Failed to create pitch"
    };
  }
}