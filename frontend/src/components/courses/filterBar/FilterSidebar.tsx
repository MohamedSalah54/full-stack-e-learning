"use client";

import CategoriesFilter from "./CategoriesFilter";
import FilterActions from "./FilterActions";
import InstructorFilter from "./InstructorFilter";
import LevelsFilter from "./LevelsFilter";
import PriceFilter from "./PriceFilter";
import TagsFilter from "./TagsFilter";



export default function FilterSidebar() {
  return (
<aside
  className="
    w-[300px]
    px-4 
    py-6 
    flex 
    flex-col 
    gap-5
    sticky
    top-0
    h-fit
  "
>


      <PriceFilter />
      <CategoriesFilter />
      <TagsFilter />
      <InstructorFilter />
      <LevelsFilter />
      <FilterActions />
      </aside>
  );
}
