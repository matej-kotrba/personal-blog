import React from "react";

function FullPageSectionWrapper({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <section className="col-span-6 p-6 bg-white rounded-md dark:bg-slate-800">
      {children}
    </section>
  );
}

export default FullPageSectionWrapper;
