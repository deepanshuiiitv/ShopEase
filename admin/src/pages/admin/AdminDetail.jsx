import { useLocation, useNavigate } from 'react-router-dom';

export default function AdminDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const admin = location.state?.admin;

  if (!admin) {
    return (
      <div className="max-w-xl mx-auto mt-12 text-center text-red-600">No admin data found.</div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-12">
      <h1 className="text-3xl font-extrabold text-blue-700 mb-6">Admin Details</h1>
      <div className="space-y-4">
        <div><span className="font-bold">ID:</span> {admin.id}</div>
        <div><span className="font-bold">Name:</span> {admin.name}</div>
        <div><span className="font-bold">Role:</span> {admin.role}</div>
        <div><span className="font-bold">Status:</span> {admin.status}</div>
      </div>
      <button
        className="mt-8 bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700 transition"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>
  );
} 