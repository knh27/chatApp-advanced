

export const VisuallyHiddenInput = (props) => {
    return (
      <input
        {...props}
        type="file"
        className="absolute w-px h-px overflow-hidden border-0 p-0 m-[-1px] whitespace-nowrap 
                   clip-[rect(0px,0px,0px,0px)] clip-path-[inset(100%)]"
        aria-hidden="true"
      />
    );
  };
  
  
  