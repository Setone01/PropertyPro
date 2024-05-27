import { createUserTable } from "../models";
import { createPropertyTable } from "../models";

(async () => {
  try {
    await createUserTable();
    await createPropertyTable();
  } catch (error) {
    console.log(`Error in Migration ${error}`);
  }
})();
